import type { MenuModelRegistry } from '@theia/core/lib/common/menu/menu-model-registry';
import { injectable } from '@theia/core/shared/inversify';
import { MonacoEditorMenuContribution as TheiaMonacoEditorMenuContribution } from '@theia/monaco/lib/browser/monaco-menu';
import { EditContributions } from '../../contributions/edit-contributions';
import { nls } from '@theia/core/lib/common';


@injectable()
export class MonacoEditorMenuContribution extends TheiaMonacoEditorMenuContribution {
  
  override registerMenus(registry: MenuModelRegistry): void {
    super.registerMenus(registry);
    // https://github.com/arduino/arduino-ide/issues/1394
    registry.unregisterMenuAction('editor.action.refactor'); // Refactor...
    registry.unregisterMenuAction('editor.action.sourceAction'); // Source Action...
    // https://github.com/arduino/arduino-ide/pull/2027#pullrequestreview-1414246614
    // Root editor context menu
    registry.unregisterMenuAction('editor.action.revealDeclaration'); // Go to Declaration
    registry.unregisterMenuAction('editor.action.goToTypeDefinition'); // Go to Type Definition
    registry.unregisterMenuAction('editor.action.goToImplementation'); // Go to Implementations
    registry.unregisterMenuAction('editor.action.goToReferences'); // Go to References
    // Peek submenu
    registry.unregisterMenuAction('editor.action.peekDeclaration'); // Peek Declaration
    registry.unregisterMenuAction('editor.action.peekTypeDefinition'); // Peek Type Definition
    registry.unregisterMenuAction('editor.action.peekImplementation'); // Peek Implementation
    registry.unregisterMenuAction('editor.action.referenceSearch.trigger'); // Peek References

    //#2445, add comment/uncomment to right click menu
    registry.registerMenuAction(EditorMainMenu.LANGUAGE_FEATURES_GROUP, {
      commandId: EditContributions.Commands.TOGGLE_COMMENT,
      label: nls.localize(
        'arduino/editor/commentUncomment',
        'Comment/Uncomment'
      )
    });
  }
}
