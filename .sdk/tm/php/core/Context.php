<?php
declare(strict_types=1);

// UrlShortener SDK context

require_once __DIR__ . '/Control.php';
require_once __DIR__ . '/Operation.php';
require_once __DIR__ . '/Spec.php';
require_once __DIR__ . '/Result.php';
require_once __DIR__ . '/Response.php';
require_once __DIR__ . '/Error.php';
require_once __DIR__ . '/Helpers.php';

class UrlShortenerContext
{
    public string $id;
    public array $out;
    public mixed $client;
    public ?UrlShortenerUtility $utility;
    public UrlShortenerControl $ctrl;
    public array $meta;
    public ?array $config;
    public ?array $entopts;
    public ?array $options;
    public mixed $entity;
    public ?array $shared;
    public array $opmap;
    public array $data;
    public array $reqdata;
    public array $match;
    public array $reqmatch;
    public ?array $point;
    public ?UrlShortenerSpec $spec;
    public ?UrlShortenerResult $result;
    public ?UrlShortenerResponse $response;
    public UrlShortenerOperation $op;

    public function __construct(array $ctxmap = [], ?self $basectx = null)
    {
        $this->id = 'C' . random_int(10000000, 99999999);
        $this->out = [];

        $this->client = UrlShortenerHelpers::get_ctx_prop($ctxmap, 'client') ?? ($basectx ? $basectx->client : null);
        $this->utility = UrlShortenerHelpers::get_ctx_prop($ctxmap, 'utility') ?? ($basectx ? $basectx->utility : null);

        $this->ctrl = new UrlShortenerControl();
        $ctrl_raw = UrlShortenerHelpers::get_ctx_prop($ctxmap, 'ctrl');
        if (is_array($ctrl_raw)) {
            if (array_key_exists('throw', $ctrl_raw)) {
                $this->ctrl->throw_err = $ctrl_raw['throw'];
            }
            if (isset($ctrl_raw['explain']) && is_array($ctrl_raw['explain'])) {
                $this->ctrl->explain = $ctrl_raw['explain'];
            }
        } elseif ($basectx !== null && $basectx->ctrl !== null) {
            $this->ctrl = $basectx->ctrl;
        }

        $m = UrlShortenerHelpers::get_ctx_prop($ctxmap, 'meta');
        $this->meta = is_array($m) ? $m : ($basectx ? $basectx->meta ?? [] : []);

        $cfg = UrlShortenerHelpers::get_ctx_prop($ctxmap, 'config');
        $this->config = is_array($cfg) ? $cfg : ($basectx ? $basectx->config : null);

        $eo = UrlShortenerHelpers::get_ctx_prop($ctxmap, 'entopts');
        $this->entopts = is_array($eo) ? $eo : ($basectx ? $basectx->entopts : null);

        $o = UrlShortenerHelpers::get_ctx_prop($ctxmap, 'options');
        $this->options = is_array($o) ? $o : ($basectx ? $basectx->options : null);

        $e = UrlShortenerHelpers::get_ctx_prop($ctxmap, 'entity');
        $this->entity = $e ?? ($basectx ? $basectx->entity : null);

        $s = UrlShortenerHelpers::get_ctx_prop($ctxmap, 'shared');
        $this->shared = is_array($s) ? $s : ($basectx ? $basectx->shared : null);

        $om = UrlShortenerHelpers::get_ctx_prop($ctxmap, 'opmap');
        $this->opmap = is_array($om) ? $om : ($basectx ? $basectx->opmap ?? [] : []);

        $this->data = UrlShortenerHelpers::to_map(UrlShortenerHelpers::get_ctx_prop($ctxmap, 'data')) ?? [];
        $this->reqdata = UrlShortenerHelpers::to_map(UrlShortenerHelpers::get_ctx_prop($ctxmap, 'reqdata')) ?? [];
        $this->match = UrlShortenerHelpers::to_map(UrlShortenerHelpers::get_ctx_prop($ctxmap, 'match')) ?? [];
        $this->reqmatch = UrlShortenerHelpers::to_map(UrlShortenerHelpers::get_ctx_prop($ctxmap, 'reqmatch')) ?? [];

        $pt = UrlShortenerHelpers::get_ctx_prop($ctxmap, 'point');
        $this->point = is_array($pt) ? $pt : ($basectx ? $basectx->point : null);

        $sp = UrlShortenerHelpers::get_ctx_prop($ctxmap, 'spec');
        $this->spec = ($sp instanceof UrlShortenerSpec) ? $sp : ($basectx ? $basectx->spec : null);

        $r = UrlShortenerHelpers::get_ctx_prop($ctxmap, 'result');
        $this->result = ($r instanceof UrlShortenerResult) ? $r : ($basectx ? $basectx->result : null);

        $rp = UrlShortenerHelpers::get_ctx_prop($ctxmap, 'response');
        $this->response = ($rp instanceof UrlShortenerResponse) ? $rp : ($basectx ? $basectx->response : null);

        $opname = UrlShortenerHelpers::get_ctx_prop($ctxmap, 'opname') ?? '';
        $this->op = $this->resolve_op($opname);
    }

    public function resolve_op(string $opname): UrlShortenerOperation
    {
        // Cache key is `<entity>:<opname>` so two entities with the same op
        // (e.g. both have a "list") get distinct cached Operations. Keying
        // on opname alone caused the first-resolved entity's points to be
        // served to every subsequent entity's call.
        $entname = (is_object($this->entity) && method_exists($this->entity, 'get_name'))
            ? $this->entity->get_name()
            : '_';
        $cacheKey = $entname . ':' . $opname;

        if (isset($this->opmap[$cacheKey])) {
            return $this->opmap[$cacheKey];
        }
        if ($opname === '') {
            return new UrlShortenerOperation([]);
        }

        $opcfg = \Voxgig\Struct\Struct::getpath($this->config, "entity.{$entname}.op.{$opname}");

        $input = ($opname === 'update' || $opname === 'create') ? 'data' : 'match';

        $points = [];
        if (is_array($opcfg)) {
            $t = \Voxgig\Struct\Struct::getprop($opcfg, 'points');
            if (is_array($t)) {
                $points = $t;
            }
        }

        $op = new UrlShortenerOperation([
            'entity' => $entname,
            'name' => $opname,
            'input' => $input,
            'points' => $points,
        ]);
        $this->opmap[$cacheKey] = $op;
        return $op;
    }

    public function make_error(string $code, string $msg): UrlShortenerError
    {
        return new UrlShortenerError($code, $msg, $this);
    }
}
