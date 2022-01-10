const myNav = 
`
<nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light">
        
        <div class="container-fluid">

            <a class="navbar-brand liBrand" href="index.html">
                <i class="bi bi-globe2"></i> <b>Reemo Studio</b> 
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation" style="color: black;">
                <span style="color: black;" class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">

                <div class="navbar-nav me-auto"></div>

                <div class="d-flex">

                    <ul class="navbar-nav me-auto">

                        <li class="nav-item liStuff">
                            <a class="nav-link liStuff" href="aboutMe.html" style="color: black;">
                            <i class="bi bi-file-earmark-person"></i> About me
                            </a>
                        </li>                      

                    </ul>

                </div>

            </div>
        </div>

    </nav>
`

// <li class="nav-item liStuff">
//     <a class="nav-link liStuff" href="projects.html" style="color: black;">
//     <i class="bi bi-box"></i> Projects
//     </a>
// </li>

//<li class="nav-item liStuff">
//    <a class="nav-link" href="creations.html" style="color: black;">
//    <i class="bi bi-brush"></i> Creations
//    </a>
//</li> 

// let elemDiv = document.createElement('div');
// elemDiv.innerHTML = myNav
// document.body.appendChild(elemDiv);

document.getElementById("navBar").innerHTML = myNav
   
