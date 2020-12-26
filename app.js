// Sayfadaki elemanları seçmek

const yeniGorev = document.querySelector('.form-input');
const yeniGorevEkle = document.querySelector('.form-add-button');
const yeniUl = document.querySelector('.container-item');
document.addEventListener('DOMContentLoaded',verileriOku);

yeniGorevEkle.addEventListener('click',girilenKontrol);
yeniUl.addEventListener('click',goreviSilveyaTamamla);

// Ul elementine yeni görev ekleme
function ulYeniGorevEkle(girilenDeger){
    
    //Yeni Div Oluştur ve aktar

    const yeniDivEleman = document.createElement('div');
    yeniDivEleman.classList.add('task-container');
    yeniUl.appendChild(yeniDivEleman); 


    //Yeni Li Oluştur aktar ve veriyi ekrana yazdır
    const yeniLiEleman = document.createElement('li');
    yeniLiEleman.classList.add('task-container-text');
    yeniLiEleman.innerText = girilenDeger;
    yeniDivEleman.appendChild(yeniLiEleman);
    
    //Yeni Check Button Oluştur,aktar ve çoklu sınıf ver

    const yeniChckBtnEleman = document.createElement('button');
    yeniChckBtnEleman.classList.add('task-container-btn');
    yeniChckBtnEleman.classList.add('task-check-item');
    yeniChckBtnEleman.innerHTML = '<i class="fa fa-check-square" aria-hidden="true"></i>';
    yeniDivEleman.appendChild(yeniChckBtnEleman);

    // Yeni Delete Button Oluştur,aktar ve çoklu sınıf ver

    const yeniDltBtnEleman = document.createElement('button');
    yeniDltBtnEleman.classList.add('task-container-btn');
    yeniDltBtnEleman.classList.add('task-delete-item');
    yeniDltBtnEleman.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    yeniDivEleman.appendChild(yeniDltBtnEleman);
 

}


//Ul elementine eklenen görevi kaldırma
function goreviSilveyaTamamla(e){

    tiklanilanEleman = e.target;
    
    if(tiklanilanEleman.classList.contains('task-check-item')){
        tiklanilanEleman.parentElement.classList.toggle('completed-item');
    }

    if(confirm("Are you sure?")){
        if(tiklanilanEleman.classList.contains('task-delete-item')){
            tiklanilanEleman.parentElement.classList.toggle('kaybol');
            let silinecekMetin = tiklanilanEleman.parentElement.children[0].innerText;
            verileriSil(silinecekMetin);
            tiklanilanEleman.parentElement.addEventListener('transitionend',function(){tiklanilanEleman.parentElement.remove()});
           
        }
    }
}

//Boş mu dolu mu ?

function girilenKontrol(e){
    e.preventDefault();
    if(yeniGorev.value.length > 0){
        ulYeniGorevEkle(yeniGorev.value);
        verileriKaydet(yeniGorev.value);
        yeniGorev.value= '';
    }else{
        alert("Can't be empty");
    }
}


// Localstorage Diziye Çevir

function diziyeCevir(){
    let gorevler;
    if(localStorage.getItem('gorevler') ===null){
        gorevler = [];
    }else{
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }

    return gorevler;

}

// Verileri LocalStorage dan Oku

function verileriOku(){
    let gorevler = diziyeCevir();

    gorevler.forEach(function(gorev){
        ulYeniGorevEkle(gorev);
    })
}
//Verileri LocalStorage a çevirme

function verileriKaydet(gorev){
    let gorevler = diziyeCevir();
    gorevler.push(gorev);
    localStorage.setItem('gorevler',JSON.stringify(gorevler));
}


// Verileri LocalStorage dan Silme
function verileriSil(silinecekVeri){
    let gorevler = diziyeCevir();

    const silinenEleman = gorevler.indexOf(silinecekVeri);
    gorevler.splice(silinenEleman,1);
    localStorage.setItem('gorevler',JSON.stringify(gorevler));


}