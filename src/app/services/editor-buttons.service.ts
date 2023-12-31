import { Injectable } from '@angular/core';
import { Editor } from '@tiptap/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LinkmodalComponent } from '../linkmodal/linkmodal.component';
import { TableModalComponent } from '../table-modal/table-modal.component';
import { VideoModalComponent } from '../video-modal/video-modal.component';
import { ImageModalComponent } from '../image-modal/image-modal.component';
@Injectable({
  providedIn: 'root',
})
export class EditorButtonsService {
  editor!: Editor;

  applyHeading(editor: Editor, level: 1 | 2 | 3 | 4 | 5 | 6): void {
    editor.chain().focus().toggleHeading({ level }).run();
  }

  applyBlockquote(editor: Editor): void {
    editor.chain().focus().toggleBlockquote().run();
  }

  applyCodeBlock(editor: Editor): void {
    editor.chain().focus().toggleCodeBlock().run();
  }

  applyImage(editor: Editor, modalService: NzModalService): void {
    const modal = modalService.create({
      nzContent: ImageModalComponent, // your image modal component here
      nzClosable: false,
      nzOnOk: (componentInstance) => componentInstance.submitForm(),
    });

    modal.afterClose.subscribe((base64) => {
      console.log(base64); // Check this output
      if (base64) {
        console.log('Base64:', base64);
        editor
          .chain()
          .focus()
          .insertContent({
            type: 'img',
            attrs: {
              src: base64,
            },
          })
          .run();
      }
    });
  }

  applyLink(
    editor: Editor,
    modalService: NzModalService,
    messageService: NzMessageService
  ): void {
    const modal = modalService.create({
      nzContent: LinkmodalComponent,
      nzClosable: false,
      nzOnOk: (componentInstance) => componentInstance.submit(),
    });

    modal.afterClose.subscribe((url) => {
      if (url) {
        if (url.startsWith('http://') || url.startsWith('https://')) {
          editor.chain().focus().toggleLink({ href: url }).run();
        } else {
          messageService.create(
            'error',
            `Invalid URL: ${url}. Please include the protocol (http:// or https://)`
          );
        }
      }
    });
  }

  applyBold(editor: Editor): void {
    editor.chain().focus().toggleBold().run();
  }

  applyItalic(editor: Editor): void {
    editor.chain().focus().toggleItalic().run();
  }

  applyBulletList(editor: Editor): void {
    editor.chain().focus().toggleBulletList().run();
  }

  applyOrderedList(editor: Editor): void {
    editor.chain().focus().toggleOrderedList().run();
  }

  // TableCommands
  applyTable(
    editor: Editor,
    modalService: NzModalService,
    messageService: NzMessageService
  ): void {
    const modal = modalService.create({
      nzContent: TableModalComponent, // Replace with your actual Angular component for the modal
      nzClosable: false,
      nzOnOk: (componentInstance) => componentInstance.submitForm(),
    });

    modal.afterClose.subscribe((tableData) => {
      if (tableData) {
        const { rows, cols } = tableData;
        if (rows > 0 && cols > 0) {
          editor
            .chain()
            .focus()
            .insertTable({ rows: rows, cols: cols, withHeaderRow: true })
            .run();
        } else {
          messageService.create(
            'error',
            `Invalid input. Please ensure rows and columns are greater than 0.`
          );
        }
      }
    });
  }

  deleteTable(editor: Editor): void {
    editor.chain().focus().deleteTable().run();
  }

  addRowAfter(editor: Editor): void {
    editor.chain().focus().addRowAfter().run();
  }

  deleteRow(editor: Editor): void {
    editor.chain().focus().deleteRow().run();
  }

  addColumnAfter(editor: Editor): void {
    editor.chain().focus().addColumnAfter().run();
  }

  deleteColumn(editor: Editor): void {
    editor.chain().focus().deleteColumn().run();
  }

  addVideo(editor: Editor, modalService: NzModalService): void {
    const modal = modalService.create({
      nzContent: VideoModalComponent,
      nzClosable: false,
      nzOnOk: (componentInstance) => componentInstance.submitForm(),
    });

    modal.afterClose.subscribe((videoData) => {
      if (videoData) {
        const { src } = videoData;
        if (src) {
          editor.chain().focus().setYoutubeVideo({ src }).run();
        }
      }
    });
  }

  addMark(editor: Editor) {
    editor.chain().focus().toggleMark('highlight').run();
  }

  testing() {
    console.log('testing');
  }
}
