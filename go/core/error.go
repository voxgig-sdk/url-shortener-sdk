package core

type UrlShortenerError struct {
	IsUrlShortenerError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewUrlShortenerError(code string, msg string, ctx *Context) *UrlShortenerError {
	return &UrlShortenerError{
		IsUrlShortenerError: true,
		Sdk:              "UrlShortener",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *UrlShortenerError) Error() string {
	return e.Msg
}
