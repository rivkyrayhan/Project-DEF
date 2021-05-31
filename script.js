//memilih semua elemen yang dibutuhkan
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
 
// jika tombol startQuiz diklik
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //menampilkan info box
}
 
// jika tombol keluarQuiz diklik
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //menyembunyikan info box
}
 
// jika tombol selanjutnya diklik
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //menyembunyikan info box
    quiz_box.classList.add("activeQuiz"); //menampilkan quiz box
    showQuetions(0); //memanggil fungsi showQestions
    queCounter(1); //meneruskan 1 parameter ke queCounter
    startTimer(15); //memanggil fungsi startTimer
    startTimerLine(0); //memanggil fungsi startTimerLine
}
 
let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
 
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
 
// jika tombol UlangiQuiz diklik
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //menampilkan quiz box
    result_box.classList.remove("activeResult"); //menyembunyikan result box
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //memanggil fungsi showQestions
    queCounter(que_numb); //meneruskan nilai que_numb ke queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //memanggil fungsi startTimer
    startTimerLine(widthValue); //memanggil fungsi startTimerLine
    timeText.textContent = "Waktu Tersisa:"; //ubah teks waktuTeks ke Waktu Tersisa
    next_btn.classList.remove("show"); //sembunyikan tombol selanjutnya
}
 
// jika tombol Quiz diklik
quit_quiz.onclick = ()=>{
    window.location.reload(); //muat ulang window saat ini
}
 
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");
 
// jika tombol Selanjutnya diklik
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //jika jumlah pertanyaan kurang dari total panjang pertanyaan
        que_count++; //increment nilai que_count 
        que_numb++; //increment nilai que_numb
        showQuetions(que_count); //memanggil fungsi showQestions
        queCounter(que_numb); //meneruskan nilai que_numb ke queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //memanggil fungsi startTimer
        startTimerLine(widthValue); //memanggil fungsi startTimerLine
        timeText.textContent = "Waktu Tersisa:"; //ubah timeText ke Time Left
        next_btn.classList.remove("show"); //sembunyikan tombol selanjutnya
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //memanggil fungsi showResult
    }
}
 
// mendapatkan pertanyaan dan opsi dari array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");
 
    //membuat tag span dan div baru untuk pertanyaan dan opsi serta meneruskan nilai menggunakan indeks array
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //menambahkan tag span baru di dalam que_tag
    option_list.innerHTML = option_tag; //menambahkan tag div baru di dalam option_tag
    
    const option = option_list.querySelectorAll(".option");
 
    // setel atribut onclick ke semua opsi yang tersedia
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// membuat tag div baru untuk icon
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';
 
//jika pengguna mengklik ops
function optionSelected(answer){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //mendapatkan opsi yang dipilih pengguna
    let correcAns = questions[que_count].answer; //mendapatkan jawaban yang benar dari array
    const allOptions = option_list.children.length; //mendapatkan semua item opsi
    
    if(userAns == correcAns){ //jika opsi yang dipilih pengguna sama dengan jawaban yang benar dari array
        userScore += 1; //increment nilai score dengan 1
        answer.classList.add("correct"); //menambahkan warna hijau untuk mengoreksi opsi yang dipilih
        answer.insertAdjacentHTML("beforeend", tickIconTag); //menambahkan ikon centang untuk memperbaiki opsi yang dipilih
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //menambahkan warna merah untuk memperbaiki opsi yang dipilih
        answer.insertAdjacentHTML("beforeend", crossIconTag); //menambahkan ikon silang untuk memperbaiki opsi yang dipilih
        console.log("Wrong Answer");
 
        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //jika ada opsi yang cocok dengan jawaban array 
                option_list.children[i].setAttribute("class", "option correct"); //menambahkan warna hijau ke opsi yang cocok
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //menambahkan ikon centang ke opsi yang cocok
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //setelah pengguna memilih opsi, lalu nonaktifkan semua opsi
    }
    next_btn.classList.add("show"); //tampilkan tombol berikutnya jika pengguna memilih opsi apa pun
}
 
function showResult(){
    info_box.classList.remove("activeInfo"); //menyembunyikan info box
    quiz_box.classList.remove("activeQuiz"); //menyembunyikan quiz box
    result_box.classList.add("activeResult"); //menampilkan result box
    const scoreText = result_box.querySelector(".result-box.custom-box");
    result_box.querySelector(".total-question").innerHTML = questions.length;
    result_box.querySelector(".total-correct").innerHTML = userScore;
    result_box.querySelector(".total-wrong").innerHTML = questions.length - userScore;
    const percentage = (userScore/questions.length)*100;
    result_box.querySelector(".percentage").innerHTML = percentage.toFixed() + "%";
    result_box.querySelector(".total-score").innerHTML = userScore + "/" + questions.length;
}
 
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //mengubah nilai timeCount dengan nilai waktu
        time--; //decrement nilai waktu
        if(time < 9){ //jika timer kurang dari 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //tambahkan 0 sebelum nilai waktu
        }
        if(time < 0){ //jika timer kurang dari 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Waktu Tersisa:"; //ubah teks waktu menjadi waktu istirahat
            const allOptions = option_list.children.length; //mendapatkan semua item opsi
            let correcAns = questions[que_count].answer; //mendapatkan jawaban yang benar dari array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //jika ada opsi yang cocok dengan jawaban array
                    option_list.children[i].setAttribute("class", "option correct"); //menambahkan warna hijau ke opsi yang cocok
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //menambahkan ikon centang ke opsi yang cocok
                    console.log("Waktu Tersisa : Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //setelah pengguna memilih opsi, lalu nonaktifkan semua opsi
            }
            next_btn.classList.add("show"); //tampilkan tombol berikutnya jika pengguna memilih opsi apa pun
        }
    }
}
 
function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //increment nilai waktu dengan 1
        time_line.style.width = time + "px"; //meningkatkan lebar time_line dengan px dengan nilai waktu
        if(time > 549){ //jika nilai waktu lebih besar dari 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}
 
function queCounter(index){
    //membuat tag span baru dan meneruskan nomor pertanyaan dan total pertanyaan
    let totalQueCounTag = '<span><p>'+ index +'</p> dari <p>'+ questions.length +'</p> Pertanyaan</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //menambahkan tag span baru di dalam bottom_ques_counter
}