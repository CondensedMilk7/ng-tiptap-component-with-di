import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { EditorButtonsService } from '../services/editor-buttons.service';
import { AngularNodeViewComponent } from 'ngx-tiptap';

@Component({
  selector: 'app-image-component',
  styleUrls: ['./image.component.less'],
  templateUrl: './image.component.html',
})
export class ImageComponent extends AngularNodeViewComponent {
  constructor(private _buttonService: EditorButtonsService) {
    super();
  }

  @Input() src!: string;
  @Output() action1 = new EventEmitter<void>();
  @Output() action2 = new EventEmitter<void>();
  @Output() action3 = new EventEmitter<void>();

  @HostListener('click') handleClick() {
    this._buttonService.testing();
  }

  imgClass = '';

  onAction1() {
    this._buttonService.testing();
  }

  onAction2() {
    this._buttonService.testing();
  }

  onAction3() {
    this._buttonService.testing();
  }
}
