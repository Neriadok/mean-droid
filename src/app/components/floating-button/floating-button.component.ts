import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss']
})
export class FloatingButtonComponent {
    @Output() click = new EventEmitter<Event>();
    @Input() id: string;
    @Input() class: string;
    @Input() vertical: 'top' | 'bottom';
    @Input() horizontal: 'right' | 'left';

    public emitClick(event: Event) {
        this.click.emit(event);
    }

}
