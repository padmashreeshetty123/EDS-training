let startSize=0;
let endSize=20;
export default async function decorate(block)
{
    const response=await fetch("http://localhost:3000/redirects.json");
    const dynamicBlock=document.querySelector(".dynamicdata");
    const data=await response.json();
    let ul = document.createElement('ul');
    data.data.slice(startSize,endSize).forEach(element => {
        const li=document.createElement('li');
        li.textContent=element.SOURCE+" : "+element.DESTINATION;
        ul.append(li);
    });
    dynamicBlock.append(ul);
    console.log(data.total)
    const prevButton=document.createElement("a");
    prevButton.textContent="Prev";
    prevButton.classList.add("prev","button");
    prevButton.addEventListener('click',(event)=>{
      
        event.preventDefault();
       
        if(startSize>0){
            dynamicBlock.removeChild(ul);
            console.log(startSize-20,startSize);
           ul = document.createElement('ul');
            data.data.slice(startSize-20,startSize).forEach(element => {
                console.log("dwf");
                const li=document.createElement('li');
                li.textContent=element.SOURCE+" : "+element.DESTINATION;
                ul.append(li);
                console.log(endSize);
            });
            dynamicBlock.append(ul); 
    startSize = startSize-20;
    endSize = startSize;
            }});
 

    const nextButton=document.createElement("a");
    nextButton.textContent="Next";
    nextButton.classList.add("next","button");
    nextButton.addEventListener('click',(event)=>{
        event.preventDefault();
     
      if(endSize<data.total){
        dynamicBlock.removeChild(ul);
        console.log(endSize,(data.total-(endSize))/20>=1?endSize+20:endSize+(data.total-(endSize)));
       ul = document.createElement('ul');
        data.data.slice(endSize,(data.total-(endSize))/20>=1?endSize+20:endSize+(data.total-(endSize))).forEach(element => {
            console.log("dwf");
            const li = document.createElement('li');
            li.textContent = element.SOURCE+" : "+element.DESTINATION;
            ul.append(li);
            console.log(endSize);
        });
        dynamicBlock.append(ul); 
startSize = endSize;
endSize = (data.total-(endSize))/20>=1?endSize+20:endSize+(data.total-(endSize));
        }
});
    prevButton.href=nextButton.href="/";
    dynamicBlock.append(prevButton);
    dynamicBlock.append(nextButton);

}
