import styles from '../../styles/home/main/landingSection.module.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { landingPageData } from './homeMainConfig';

export default function LandingSection() {

  const generateDynamicGridItemCss = (index, row)=>{

    let rem = index%6;

    const getRandomNo = ()=>{
      return Math.floor((Math.random()*256));
    }

    console.log({'before row': row})

    row  = (row*8)+1; // beacuse in css we have row repeat of 8 and column repeat of 8

    let styleObj = {
      gridColumnStart: 0,
      gridColumnEnd: 0,
      gridRowStart: 0,
      gridRowEnd: 0,
      backgroundColor: `rgb(${getRandomNo()}, ${getRandomNo()}, ${getRandomNo()})`
      // width: 'max-content'
    }
    if(rem===0){
      styleObj.gridColumnStart =  1;
      styleObj.gridColumnEnd = 3;
      styleObj.gridRowStart = row;
      styleObj.gridRowEnd =  row+2;
    }else if(rem===1){
      styleObj.gridColumnStart =  3;
      styleObj.gridColumnEnd =  5;
      styleObj.gridRowStart =  row;
      styleObj.gridRowEnd =  row+2;
    }else if(rem===2){
      styleObj.gridColumnStart =  5;
      styleObj.gridColumnEnd =  9;
      styleObj.gridRowStart =  row;
      styleObj.gridRowEnd =  row+5;
    }else if(rem===3){
      styleObj.gridColumnStart =  1;
      styleObj.gridColumnEnd =  5;
      styleObj.gridRowStart =  row+2;
      styleObj.gridRowEnd =  row+5;
    }else if(rem===4){
      styleObj.gridColumnStart =  1;
      styleObj.gridColumnEnd =  5;
      styleObj.gridRowStart =  row+5;
      styleObj.gridRowEnd =  row+8;
    }else{
      styleObj.gridColumnStart =  5;
      styleObj.gridColumnEnd =  9;
      styleObj.gridRowStart =  row+5;
      styleObj.gridRowEnd =  row+8;
    }

    console.log({row, styleObj})

    return styleObj;
  }


  return (
    <>
      <div className={styles['landing-section-container']}>
        <div className={styles['gallery']} >
          {
            Array.isArray(landingPageData) && landingPageData.map((imgSrc, index)=>{
              return (
                <div key={`images_${index}_home`} style={generateDynamicGridItemCss(index, Math.floor(index/6))}><img className={styles['gallery__img']} src={imgSrc} alt=""/></div>
              )
            })
          }
        </div>

      </div>
    </>
  )
}
