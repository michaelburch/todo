import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { fab, faGithub } from "@fortawesome/free-brands-svg-icons";
import { fas, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FASTElement, customElement, html, css, attr } from '@microsoft/fast-element';


const template = html<TitleBar>`
    <div class="navbar-collapse">
    <span class="title"><h3>${x => x.titleText}</h3></span>
      <ul class="nav navbar-nav ml-auto" >
        <li><a href="${x => x.infoLink}" class="nav-link"><i class="fas fa-info-circle"></i></a></li>
        <li><a href="${x => x.githubLink}" class="nav-link"><i class="fab fa-github"></i></a></li>
      </ul>
    </div>
`;

const styles = css`
.navbar-collapse {
    display: flex ;
    padding:0;
    margin:0;
    background-color: #3c3b3b;   
    
} 
.title {
  margin-top: auto;
  margin-bottom: auto;
  margin-left:4.1rem;
  flex: 1;
  text-align: center;
  color: #ddd;
}
.ml-auto, .mx-auto {
    margin-left: auto ;
}
.navbar-nav {
    padding: 0;
    margin-right:1rem;
    list-style: none;
}
.nav {
    display: flex;
    list-style: none;
    align-items: center;
    column-gap: 1rem
}
.nav-link { 
  text-align: center;
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
     library.add(fab, faGithub, fas, faInfoCircle);
// @ts-ignore 
dom.watch({
    autoReplaceSvgRoot: this.shadowRoot,
    observeMutationsRoot: this.shadowRoot
  })
 }
}