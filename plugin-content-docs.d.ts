declare module '@docusaurus/plugin-content-docs' {
  export function validateOptions({ validate, options }: OptionValidationContext<PluginOptions, PluginOptions>): PluginOptions;
}
