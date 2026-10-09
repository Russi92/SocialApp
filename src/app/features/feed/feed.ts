import { Component } from '@angular/core';
import { SideLeft } from './components/side-left/side-left';
import { SideRight } from './components/side-right/side-right';
import { FeedContent } from './components/feed-content/feed-content';

@Component({
  selector: 'app-feed',
  imports: [SideLeft,SideRight, FeedContent],
  templateUrl: './feed.html',
  styleUrl: './feed.css',
})
export class Feed {

}
