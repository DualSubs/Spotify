export interface Settings {
    /**
     * [歌词] 启用类型（多选）
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
     * [翻译器] 主语言（源语言）
     *
     * 仅当源语言识别不准确时更改此选项。
     *
     * @remarks
     *
     * Possible values:
     * - `'AUTO'` - 自动 - Automatic
     * - `'ZH'` - 中文（自动）
     * - `'ZH-HANS'` - 中文（简体）
     * - `'ZH-HK'` - 中文（香港）
     * - `'ZH-HANT'` - 中文（繁体）
     * - `'EN'` - English - 英语（自动）
     * - `'ES'` - Español - 西班牙语（自动）
     * - `'JA'` - 日本語 - 日语
     * - `'KO'` - 한국어 - 韩语
     * - `'DE'` - Deutsch - 德语
     * - `'FR'` - Français - 法语
     * - `'TR'` - Türkçe - 土耳其语
     * - `'KM'` - ភាសាខ្មែរ - 高棉语
     *
     * @defaultValue "AUTO"
     */
    /**
     * [翻译器] 副语言（目标语言）
     *
     * 请指定翻译歌词的目标语言。
     *
     * @remarks
     *
     * Possible values:
     * - `'ZH'` - 中文（自动）
     * - `'ZH-HANS'` - 中文（简体）
     * - `'ZH-HK'` - 中文（香港）
     * - `'ZH-HANT'` - 中文（繁体）
     * - `'EN'` - English - 英语（自动）
     * - `'ES'` - Español - 西班牙语（自动）
     * - `'JA'` - 日本語 - 日语
     * - `'KO'` - 한국어 - 韩语
     * - `'DE'` - Deutsch - 德语
     * - `'FR'` - Français - 法语
     * - `'TR'` - Türkçe - 土耳其语
     * - `'KM'` - ភាសាខ្មែរ - 高棉语
     *
     * @defaultValue "ZH"
     */
    Languages?: ('AUTO' | 'ZH' | 'ZH-HANS' | 'ZH-HK' | 'ZH-HANT' | 'EN' | 'ES' | 'JA' | 'KO' | 'DE' | 'FR' | 'TR' | 'KM' | 'ZH' | 'ZH-HANS' | 'ZH-HK' | 'ZH-HANT' | 'EN' | 'ES' | 'JA' | 'KO' | 'DE' | 'FR' | 'TR' | 'KM')[];
    /**
     * [翻译器] 服务商API
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
     * [歌词] 服务商API
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
    /**
     * [调试] 日志等级
     *
     * 选择脚本日志的输出等级，低于所选等级的日志将全部输出。
     *
     * @remarks
     *
     * Possible values:
     * - `'OFF'` - 🔴 关闭
     * - `'ERROR'` - ❌ 错误
     * - `'WARN'` - ⚠️ 警告
     * - `'INFO'` - ℹ️ 信息
     * - `'DEBUG'` - 🅱️ 调试
     * - `'ALL'` - 全部
     *
     * @defaultValue "WARN"
     */
    LogLevel?: 'OFF' | 'ERROR' | 'WARN' | 'INFO' | 'DEBUG' | 'ALL';
}
