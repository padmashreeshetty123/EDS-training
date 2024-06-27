let start_size=0;
let end_size=20;
export default async function decorate(block)
{
    const response=await fetch("http://localhost:3000/redirects.json");
    const dynamicBlock=document.querySelector(".dynamicdata");
    const data=await response.json();
    let ul=document.createElement('ul');
    data.data.slice(start_size,end_size).forEach(element => {
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
       
        if(start_size>0){
            dynamicBlock.removeChild(ul);
            console.log(start_size-20,start_size);
           ul=document.createElement('ul');
            data.data.slice(start_size-20,start_size).forEach(element => {
                console.log("dwf");
                const li=document.createElement('li');
                li.textContent=element.SOURCE+" : "+element.DESTINATION;
                ul.append(li);
                console.log(end_size);
            });
            dynamicBlock.append(ul); 
    start_size=start_size-20;
    end_size=start_size;
            }});
 

    const nextButton=document.createElement("a");
    nextButton.textContent="Next";
    nextButton.classList.add("next","button");
    nextButton.addEventListener('click',(event)=>{
        event.preventDefault();
     
      if(end_size<data.total){
        dynamicBlock.removeChild(ul);
        console.log(end_size,(data.total-(end_size))/20>=1?end_size+20:end_size+(data.total-(end_size)));
       ul=document.createElement('ul');
        data.data.slice(end_size,(data.total-(end_size))/20>=1?end_size+20:end_size+(data.total-(end_size))).forEach(element => {
            console.log("dwf");
            const li=document.createElement('li');
            li.textContent=element.SOURCE+" : "+element.DESTINATION;
            ul.append(li);
            console.log(end_size);
        });
        dynamicBlock.append(ul); 
start_size=end_size;
end_size=(data.total-(end_size))/20>=1?end_size+20:end_size+(data.total-(end_size));
        }
});
    prevButton.href=nextButton.href="/";
    dynamicBlock.append(prevButton);
    dynamicBlock.append(nextButton);

}
