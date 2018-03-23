
$(function(){
 easy_compare();
});

RegExp.escape= function(s) {
   return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

function easy_compare(){
 $("tr").each(function(){
   var tr=$(this);
   var current=$("td",tr).eq(0);
   var revision=$("td",tr).eq(2);
   console.log($("h3",revision).text());

   var p2=current.html();
   $(".dwa",revision).each(function(){
     var p=revision.html();
     var dwa=$(this);
     //console.log(dwa.text());
     var code_block=$('<div>').append(dwa.clone()).html();
     code_block=RegExp.escape(code_block);
     var re_str="([^ ]+|\n) ?"+code_block+" ?([^ ]+|$)";
     var re=new RegExp(re_str)
     var block=p.match(re);
     if(block){
       //console.log(block[0]);
       var re_str2=block[1]+' ?<span class="dwd">([^>]+)</span> ?'+block[2];


       var re2=new RegExp(re_str2)
       var block2=p2.match(re2);


       if(block2){
         var rev_len=dwa.text().replace(/\(.+?\)/,"").length;
         var org_len=block2[1].length;
         var diff_len=Math.abs(rev_len-org_len);
         if(diff_len<=5){
         dwa.addClass("subtle");
         var re_str3=block[1]+' <span class="dwd subtle">'+block2[1]+'</span>'+$('<div>').append(dwa.clone()).html()+' '+block[2];
         p2=p2.replace(block2[0],re_str3);
         //console.log(block2[0]);
         }
       }

     }
     current.html(p2);

   })
 })
}
