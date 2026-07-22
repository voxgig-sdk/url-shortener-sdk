package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewIndexEntityFunc func(client *UrlShortenerSDK, entopts map[string]any) UrlShortenerEntity

