import pluginContentDocs, { PluginOptions as _PluginOptions, LoadedContent, validateOptions as _validateOptions } from '@docusaurus/plugin-content-docs';
import { Plugin, LoadContext, OptionValidationContext } from '@docusaurus/types';
import { join } from 'path';

export type PluginOptions = _PluginOptions & { downloader: (root: string) => Promise<void> };

export type Options = Partial<PluginOptions>;

export default async function pluginRemoteDocs(context: LoadContext, options: PluginOptions): Promise<Plugin<LoadedContent>> {
  const plugin = await pluginContentDocs(context, options);

  return {
    ...plugin,
    loadContent: async function () {
      const root = join(context.siteDir, options.path);
      await options.downloader(root);
      return await plugin.loadContent!();
    }
  };
}

export function validateOptions({ validate, options }: OptionValidationContext<PluginOptions, PluginOptions>): PluginOptions {
  const { downloader, ..._options } = options;
  return { downloader, ..._validateOptions({ validate, options: _options }) };
}
