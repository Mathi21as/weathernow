import './styles/layout.css'
import linkedin from './../Resourses/linkedinimg.png'

const Layout = ({extended}) => {
  return(
    <div className="layout row justify-content-center p-4" key={"985"}>
      {
        extended.map(el => el)
      }
      <hr className="m-2"/>
      <div id="divfoot" className="text-center">
        <footer>
              <span>Developed by Mathias Ledesma</span>
              <a href="https://github.com/Mathi21as/weathernow/tree/main/docs" target="_blank" rel="noreferrer"><img className="imgLayout" src="./../Resourses/githubimg.png" alt='GitHub'/></a>
              <a href="https://www.linkedin.com/in/mathias-ledesma-9a6b62212" target="_blank" rel="noreferrer"><img className="imgLayout" src={linkedin} alt='LinkedIn'/></a>
        </footer>
        </div>
    </div>
  )
}

export default Layout
