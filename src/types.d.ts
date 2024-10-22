export interface Settings {
    /**
     * 总功能开关
     *
     * 是否启用此APP修改
     *
     * @defaultValue true
     */
    Switch?: boolean;
    /**
     * [歌词]启用类型（多选）
     *
     * 请选择要添加的歌词选项，如果为多选，则会自动决定提供的歌词类型。
     *
     * @remarks
     *
     * Possible values:
     * - `'Translate'` - 翻译歌词（翻译器）
     * - `'External'` - 外部歌词（外部源）
     *
     * @defaultValue ["Translate","External"]
     */
    Types?: ('Translate' | 'External')[];
    /**
     * [翻译器]服务商API
     *
     * 请选择翻译器所使用的服务商API，更多翻译选项请使用BoxJs。
     *
     * @remarks
     *
     * Possible values:
     * - `'Google'` - Google Translate
     * - `'Microsoft'` - Microsoft Translator（需填写API）
     *
     * @defaultValue "Google"
     */
    Vendor?: 'Google' | 'Microsoft';
    /**
     * [歌词]服务商API
     *
     * 请选择外部源所使用的服务商API。
     *
     * @remarks
     *
     * Possible values:
     * - `'NeteaseMusic'` - 网易云音乐（官方）
     * - `'QQMusic'` - QQ音乐（官方）
     * - `'NeteaseMusicNodeJS'` - 网易云音乐 NodeJS API
     *
     * @defaultValue "NeteaseMusic"
     */
    LrcVendor?: 'NeteaseMusic' | 'QQMusic' | 'NeteaseMusicNodeJS';
}
