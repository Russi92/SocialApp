import { ChangeDetectorRef, Component, inject, input, Input, OnInit } from '@angular/core';
import { CommentsService } from './comments-service';
import { CommentInterface } from './models/comment-interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments-post',
  imports: [ReactiveFormsModule],
  templateUrl: './comments-post.html',
  styleUrl: './comments-post.css',
})
export class CommentsPost implements OnInit {
  private readonly commentsService = inject(CommentsService);
  private readonly cdr = inject(ChangeDetectorRef);

  commentsList: CommentInterface[] = [];
  createPost = new FormControl('');
  saveFile: File | null = null;
  imgUrl: string | ArrayBuffer | null | undefined;

  @Input() postId: string = '';

  ngOnInit(): void {
    this.getAllComments();
  }

  getAllComments(): void {
    this.commentsService.getPostComment(this.postId).subscribe({
      next: (res) => {
        // console.log(res);
        this.commentsList = res.data.comments;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  changeImg(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      this.saveFile = input.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.saveFile);
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        this.imgUrl = e.target?.result;
        this.cdr.detectChanges();
      };
    }
  }

  removeImg(input: HTMLInputElement): void {
    this.imgUrl = null;
    this.saveFile = null;
    input.value = '';
  }

  submitComment(e: Event, resetDataForm: HTMLFormElement): void {
    e.preventDefault();
    const formData = new FormData();
    if (this.createPost.value) {
      formData.append('content', this.createPost.value);
    }
    if (this.saveFile) {
      formData.append('image', this.saveFile);
    }
    this.commentsService.createComment(this.postId, formData).subscribe({
      next: (res) => {
        if (res.success) {
          resetDataForm.reset();
          this.imgUrl = '';
          this.getAllComments();
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
