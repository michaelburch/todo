<script>
  import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
  import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
  import Icon from "fa-svelte";
</script>

<nav class="navbar navbar-expand navbar-light bg-light fixed-top">

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="nav navbar-nav ml-auto">
      <li class="nav-item ">
        <a class="nav-link" href="https://www.michaelburch.net" target="_blank">
          <Icon icon={faInfoCircle} class="icon" />
        </a>
      </li>
      <li class="nav-item ">
        <a class="nav-link" href="https://github.com/michaelburch/todo" target="_blank">
          <Icon icon={faGithub} class="icon" />
        </a>
      </li>
    </ul>
  </div>
</nav>
