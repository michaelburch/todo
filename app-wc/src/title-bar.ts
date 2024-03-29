import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FASTElement, customElement, html, css, attr } from '@microsoft/fast-element';

const template = html<TitleBar>`
    <div class="navbar">
      <div class="nav"></div>
      <div class="title"><span><h3>${x => x.titleText}</h3></span></div>
      <div class="nav">
        <ul class="link-list" >
          <li><a href="${x => x.infoLink}" class="nav-link"><i class="fas fa-info-circle" alt="Link to more information about this app" title="More Information"></i></a></li>
          <li><a href="${x => x.githubLink}" class="nav-link"><i class="fab fa-github" alt="Link to source code on Github" title="Source Code"></i></a></li>
        </ul>
      </div>
    </div>
`;

const styles = css`
.navbar {
    display: flex ;
    background-color: var(--fill-color);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 calc(4 * 0.5px) calc((4 * 1px)) rgba(0, 0, 0, 0.14);
    border-bottom: 1px solid var(--border-color);   
} 
.title {
  margin-top: auto;
  margin-bottom: auto;
  flex: 1;
  text-align: center;
  color: var(--font-color);
  //border-right: 1px solid var(--border-color);
}
.nav {
    display: inline;
    width: 7rem;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: .6rem;
    margin-left: auto;
}
.link-list {
  display: flex;
  list-style: none;
  column-gap: 1rem;
  justify-content: center; 
}
.nav-link { 
  padding: 0 1.2rem 0 0 ;
  color: var(--font-color);
}
`;

@customElement({
  name: 'title-bar',
  template,
  styles
})
export class TitleBar extends FASTElement {
  @attr declare titleText: string;
  @attr declare infoLink: string;
  @attr declare githubLink: string;
  constructor() {
     super();
     library.add(faGithub, faInfoCircle);
// @ts-ignore 
dom.watch({
    autoReplaceSvgRoot: this.shadowRoot,
    //observeMutationsRoot: this.shadowRoot
  })
 }
}