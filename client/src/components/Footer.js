import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap";
function Footer(){
    return(
    <footer>
        {/* <div className='footer-content'>
           <h3>Lakshmi's Website</h3>
           <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem error praesentium veritatis rerum tempora, ab reprehenderit. Architecto culpa enim id dignissimos perferendis quisquam accusamus modi! Itaque consequuntur veritatis aliquam distinctio.</p>
           
        </div> */}
        {/* <div style={{height:"25px",background:"#111"}}> */}
            <p>copyright &copy;2023. <span>Lakshmi's website</span> </p>
            <ul className="socials"> 
                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                <li><a href="#"><i className="fa fa-youtube"></i></a></li>
                <li><a href="#"><i className="fa fa-linkedin-square"></i></a></li>
            </ul>

        {/* </div> */}
    </footer>
    )
}

export default Footer
