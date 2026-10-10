import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { CommentsService } from './comments-service';
import { CommentInterface } from './models/comment-interface';

@Component({
  selector: 'app-comments-post',
  imports: [],
  templateUrl: './comments-post.html',
  styleUrl: './comments-post.css',
})
export class CommentsPost implements OnInit {
  private readonly commentsService = inject(CommentsService);
  private readonly cdr = inject(ChangeDetectorRef);
  commentsList: CommentInterface[] = [];

  @Input() postId: string = '';

  ngOnInit(): void {
    this.getAllComments();
  }

  getAllComments(): void {
    this.commentsService.getPostComment(this.postId).subscribe({
      next: (res) => {
        // console.log(res);
        this.commentsList = res.data.comments;
this.cdr.detectChanges()
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
