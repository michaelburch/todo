import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FASTElement, customElement, html, css, attr } from '@microsoft/fast-element';

const template = html<TitleBar>`
    <div class="navbar">
      <div class="nav"></div>
      <div class="title"><span><h3>${x => x.titleText}</h3></span></div>
      <div class="nav">
        <ul class="link-list ml-auto" >
          <li><a href="${x => x.infoLink}" class="nav-link"><i class="fas fa-info-circle" alt="Link to more information about this app" title="More Information"></i></a></li>
          <li><a href="${x => x.githubLink}" class="nav-link"><i class="fab fa-github" alt="Link to source code on Github" title="Source Code"></i></a></li>
        </ul>
      </div>
    </div>
`;

const styles = css`
.navbar {
    display: flex ;
    background-color: #3c3b3b;   
} 
.title {
  margin-top: auto;
  margin-bottom: auto;
  flex: 1;
  text-align: center;
  color: #ddd;
}
.ml-auto {
  margin-left: auto;
}
.nav {
    display: flex;
    flex: 33%;
    margin-top: auto;
    margin-bottom: auto;
}
.link-list {
  display: flex;
  list-style: none;
  column-gap: 1rem;
  margin-right: 1rem;
   
}
.nav-link { 
  padding: 0.3rem 1.2rem 0 0 ;
  color: #ddd;
}
`;

@customElement({
  name: 'title-bar',
  template,
  styles
})
export class TitleBar extends FASTElement {
  @attr titleText = "";
  @attr infoLink = "#";
  @attr githubLink = "#";
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