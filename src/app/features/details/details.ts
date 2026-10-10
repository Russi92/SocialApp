import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Posts } from '../../core/services/posts';
import { PostInterface } from '../../core/models/post-interface';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly posts = inject(Posts);
  private readonly cdr = inject(ChangeDetectorRef);

  postId: string = '';
  postDetails: PostInterface = {} as PostInterface;

  ngOnInit(): void {
    this.getId();
    this.getPostDetails();
  }

  getId(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.postId = param.get('id')!;
    });
  }

  getPostDetails(): void {
    this.posts.getSinglePost(this.postId).subscribe({
      next: (res) => {
        console.log(res);
        this.postDetails = res.data.post;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
