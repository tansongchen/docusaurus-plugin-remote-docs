import pluginContentDocs, { PluginOptions, LoadedContent } from '@docusaurus/plugin-content-docs';
import { Plugin, LoadContext } from '@docusaurus/types';
import { join } from 'path';
export * from '@docusaurus/plugin-content-docs';

export default async function pluginRemoteDocs(context: LoadContext, options: PluginOptions & { downloader: (root: string) => Promise<void> }): Promise<Plugin<LoadedContent>> {
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
