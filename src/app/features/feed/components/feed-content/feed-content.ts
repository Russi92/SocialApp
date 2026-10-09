import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Posts } from '../../../../core/services/posts';
import { PostInterface } from '../../../../core/models/post-interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommentsPost } from './components/comments-post/comments-post';

@Component({
  selector: 'app-feed-content',
  imports: [ReactiveFormsModule, CommentsPost],
  templateUrl: './feed-content.html',
  styleUrl: './feed-content.css',
})
export class FeedContent implements OnInit {
  private readonly posts = inject(Posts);
  private readonly cdr = inject(ChangeDetectorRef);
  content: FormControl = new FormControl('');
  privacy: FormControl = new FormControl('public');

  userId: string = '';
  postsList: PostInterface[] = [];
  saveFile: File | null = null;
  imgUrl: string | ArrayBuffer | null | undefined;

  ngOnInit(): void {
    this.getALlPostsData();
    this.userId = JSON.parse(localStorage.getItem('socialUser')!)?._id;
  }

  getALlPostsData(): void {
    this.posts.getAllPosts().subscribe({
      next: (res) => {
        // console.log(res.data.posts);
        this.postsList = res.data.posts;
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
    this.cdr.detectChanges();
  }

  submitForm(e: Event, resetDataForm: HTMLFormElement): void {
    e.preventDefault();

    const formData = new FormData();
    if (this.content.value) {
      formData.append('body', this.content.value);
    }
    if (this.privacy.value) {
      formData.append('privacy', this.privacy.value);
    }
    if (this.saveFile) {
      formData.append('image', this.saveFile);
    }
    this.posts.createPosts(formData).subscribe({
      next: (res) => {
        if (res.success) {
          resetDataForm.reset();
          this.imgUrl = '';
          this.getALlPostsData();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deletePostitem(postId: string): void {
    this.posts.deletePost(postId).subscribe({
      next: (res) => {
        if (res.success) {
          this.getALlPostsData();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
