import { AfterViewChecked, Component, ElementRef, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChatMessage } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe';

@Component({
  selector: 'app-recipe-chat',
  imports: [FormsModule],
  templateUrl: './recipe-chat.html',
  styleUrl: './recipe-chat.scss',
})
export class RecipeChat implements AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  userInput = '';
  history = signal<ChatMessage[]>([]);
  loading = signal(false);
  error = signal('');

  constructor(private recipeService: RecipeService) {}

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  send(): void {
    const message = this.userInput.trim();
    if (!message || this.loading()) return;

    this.history.update((h) => [...h, { role: 'user', content: message }]);
    this.userInput = '';
    this.loading.set(true);
    this.error.set('');

    this.recipeService
      .chat({ message, history: this.history().slice(0, -1) })
      .subscribe({
        next: (res) => {
          this.history.update((h) => [...h, { role: 'assistant', content: res.reply }]);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(err?.error?.detail || 'Failed to send message. Please try again.');
          this.loading.set(false);
        },
      });
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch {
      // ignore
    }
  }
}
