import { Component, inject, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../../services/ai.service';
import { marked } from 'marked';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chat-widget-container" [class.open]="isOpen()" [class.light-mode]="!isDarkMode()">
      <!-- Chat Button -->
      <button class="chat-toggle-btn" (click)="toggleChat()" *ngIf="!isOpen()">
        <i class="fas fa-comment-dots"></i>
      </button>

      <!-- Chat Window -->
      <div class="chat-window" *ngIf="isOpen()">
        <div class="chat-header">
          <div class="chat-title">
            <i class="fas fa-robot"></i> Shenouda AI
          </div>
          <div class="chat-controls">
            <button class="theme-toggle-btn" (click)="toggleTheme()" [title]="isDarkMode() ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
              <i class="fas" [class.fa-sun]="isDarkMode()" [class.fa-moon]="!isDarkMode()"></i>
            </button>
            <label class="deep-think-toggle" title="Enable Deep Think Mode">
              <span class="switch">
                <input type="checkbox" [(ngModel)]="useDeepThink">
                <span class="slider"></span>
              </span>
              <i class="fas fa-brain" [class.active]="useDeepThink"></i>
            </label>
            <button class="close-btn" (click)="toggleChat()">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <div class="chat-messages" #messagesContainer>
          <div class="message model">
            <div class="message-content">
              Hello! I am the AI assistant for Shenouda Tharwat. How can I help you today?
            </div>
          </div>
          
          @for (msg of messages(); track $index; let last = $last) {
            <div class="message" [class]="msg.role" [class.generating]="isGenerating() && last && msg.role === 'model'">
              <div class="message-content" [innerHTML]="parseMarkdown(msg.text)"></div>
              @if (msg.isThinking) {
                <div class="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              }
            </div>
          }
        </div>

        <div class="chat-input-area">
          <input 
            type="text" 
            [(ngModel)]="currentInput" 
            (keyup.enter)="sendMessage()"
            placeholder="Ask a question..."
            [disabled]="isGenerating()"
          >
          <button (click)="sendMessage()" [disabled]="!currentInput.trim() || isGenerating()">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./chat-widget.css']
})
export class ChatWidgetComponent implements AfterViewChecked {
  aiService = inject(AiService);
  
  isOpen = signal(false);
  isDarkMode = signal(true);
  messages = signal<ChatMessage[]>([]);
  currentInput = '';
  isGenerating = signal(false);
  useDeepThink = false;

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  toggleChat() {
    this.isOpen.update(v => !v);
  }

  toggleTheme() {
    this.isDarkMode.update(v => !v);
  }

  parseMarkdown(text: string): string {
    if (!text) return '';
    return marked.parse(text, { async: false }) as string;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch(err) { }
  }

  async sendMessage() {
    if (!this.currentInput.trim() || this.isGenerating()) return;

    const userMsg = this.currentInput.trim();
    this.currentInput = '';
    
    // Add user message
    this.messages.update(m => [...m, { role: 'user', text: userMsg }]);
    
    // Add empty model message with thinking indicator
    this.messages.update(m => [...m, { role: 'model', text: '', isThinking: true }]);
    this.isGenerating.set(true);

    try {
      const stream = this.aiService.sendMessageStream(userMsg, this.useDeepThink);
      
      for await (const chunk of stream) {
        this.messages.update(msgs => {
          const newMsgs = [...msgs];
          const lastMsg = newMsgs[newMsgs.length - 1];
          lastMsg.text += chunk;
          lastMsg.isThinking = false; // Hide indicator once text starts flowing
          return newMsgs;
        });
      }
    } catch (error) {
      this.messages.update(msgs => {
        const newMsgs = [...msgs];
        const lastMsg = newMsgs[newMsgs.length - 1];
        lastMsg.text = "Sorry, I encountered an error connecting to the AI. Please try again later.";
        lastMsg.isThinking = false;
        return newMsgs;
      });
    } finally {
      this.isGenerating.set(false);
    }
  }
}
