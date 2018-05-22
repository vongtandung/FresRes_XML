function Tao_Chuoi_HTML_Danh_sach_Mat_hang(Danh_sach) {

    var Dia_chi_Media = "./images"
    var Th_Danh_sach = document.createElement("div")
    Th_Danh_sach.className = "row"
    

    for (var i = 0; i < Danh_sach.getElementsByTagName("Mon_an").length; i++) {
        
        var Mon_an = Danh_sach.getElementsByTagName("Mon_an")[i]
        var Ten = Mon_an.getAttribute("Ten")
        var Ma_so = Mon_an.getAttribute("Ma_so")
        var Don_gia = Mon_an.getAttribute("Don_gia")

        
        var Th_Hinh = document.createElement("img");
        Th_Hinh.src = `${Dia_chi_Media}/${Ma_so}.jpg`;
        Th_Hinh.className = "card-img-top";
                
        var Th_Thong_tin=document.createElement("div")
        Th_Thong_tin.className="card-body"

        var Tieu_de = document.createElement("h3");
        Tieu_de.className = "caption";
        Tieu_de.style="color:blue";
        Tieu_de.innerText =  Ten;

       var Gia=document.createElement("h4");
       Gia.innerText="Giá: "+ Don_gia + " VNĐ";


        Th_Thong_tin.appendChild(Tieu_de);
        Th_Thong_tin.appendChild(Gia);

        var Th_Mat_hang = document.createElement("div")
        Th_Mat_hang.className = "thumbnail col-md-3";
        Th_Mat_hang.appendChild(Th_Hinh)
        Th_Mat_hang.appendChild(Th_Thong_tin)
        Th_Danh_sach.appendChild(Th_Mat_hang)
     

    }
    
    var Chuoi_HTML = Th_Danh_sach.outerHTML
   
    return Chuoi_HTML
}



// ************** Xử lý Lưu trữ ***********
function Doc_Danh_sach_Mat_hang() {
    var url = "http://localhost:3000/?Ma_so_Xu_ly=Doc_du_lieu_mon_an"
    var Xu_ly_HTTP = new XMLHttpRequest()
    Xu_ly_HTTP.open("GET", url, false)
    Xu_ly_HTTP.send("")
    var Du_lieu = new DOMParser().parseFromString(Xu_ly_HTTP.responseText, "text/xml").documentElement;
    return Du_lieu
}


function Thay_doi_Select(Danh_sach) {
    var select = document.getElementsByTagName("select")[0];
    var selected = select.options[select.selectedIndex].value;

    for (var i = 0; i < Danh_sach.getElementsByTagName("Tivi").length; i++) {
        var id = Danh_sach.getElementsByTagName("Tivi")[i].getAttribute("Ma_so");
        if (id === selected) {
            document.getElementById("price").value = Danh_sach.getElementsByTagName("Tivi")[i].getAttribute("Don_gia_Nhap");
            var soluong = parseInt(document.getElementById('amount').value);
            if (!isNaN(soluong) && soluong > 0) {
                document.getElementById('money').value = (soluong * parseInt(document.getElementById("price").value)).toString();
            }
            break;
        }
    }
}

function Kiem_tra_Du_lieu_va_Nhap_hang(Danh_sach) {
    var select = document.getElementsByTagName("select")[0];
    var selected = select.options[select.selectedIndex].value;

    if (selected == "Lựa Chọn Tivi Cần Nhập") {
        alert("Vui lòng chọn tivi để nhập.");
        return Danh_sach;
    }

    var amount = parseInt(document.getElementById("amount").value);
    if (isNaN(amount)) {
        alert("Vui lòng nhập số lượng để nhập hàng.");
        return Danh_sach;
    }

    var date = document.getElementById('dateImport').value;
    if (date == "") {
        alert("Vui lòng chọn ngày nhập hàng.");
    }
    return Nhap_hang(date, selected, amount);
}

function Nhap_hang(date, idTivi, amount) {
    var url = "http://localhost:3000/?Ma_so_Xu_ly=Cap_nhat_Du_lieu_Nhan_vien_Nhap_hang&Ngay_nhap=" + date + "&Ma_so=" + idTivi + "&So_luong=" + amount;
    console.log(url);
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send("");
    var Du_lieu = new DOMParser().parseFromString(xhttp.responseText, "text/xml").documentElement;
    return Du_lieu;
}   

function updateComponent(Danh_sach) {
    var soluong = parseInt(document.getElementById('amount').value);
    if (soluong >= 0) {
        var price = document.getElementById("price").value;
        if (!isNaN(price)) {
            document.getElementById('money').value = (soluong * price).toString();
            document.getElementById('totalMoney').value = document.getElementById('money').value;
        }
    }
}