import { ExtensionContext, services, workspace, LanguageClient } from 'coc.nvim'
import * as glob from 'glob'
import * as path from 'path'

export async function activate(context: ExtensionContext): Promise<void> {
    /*                                                           
         * Trying to start Camel LS in a programatic way.            
         *                                                           
         */
    const config = workspace.getConfiguration('coc-camel')
    const isEnable = config.get<boolean>('enable', true)
      if (!isEnable) {
        return
    }

    const jarFound = glob.sync('**/camel-lsp-server-*.jar')
    const jarPath = path.resolve(jarFound[0])

    const serverOptions = {
        // command: '/usr/bin/java -jar'.concat(' ').concat(jarPath).toString() // run camells
        command: 'java',
        args: ["-jar", jarPath]
    }
    const clientOptions = {
        documentSelector: ['java', 'xml'] // run camells on java files
    }
    const client = new LanguageClient(
            'coc-camel', // the id
            'coc-camel', // the name of the language server
            serverOptions,
        clientOptions,
        true
    )
    context.subscriptions.push(services.registLanguageClient(client))
}
