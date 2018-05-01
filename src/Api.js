import React, { Component } from 'react';
import { Image } from 'react-native';

class Cloth {
    constructor(id, name, image) {
        this.id = id;
        this.name = name;
        this.image = image;
    }
}
class Voucher {
    constructor(id, name, value, logo) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.logo = logo;
    }
}

var vouchers = [
    new Voucher(1, "Prada", "15%", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Prada-Logo.svg/268px-Prada-Logo.svg.png"),
    new Voucher(2, "Giorgio Armani", "10%", "https://seeklogo.com/images/G/Giorgio_Armani-logo-C67193A325-seeklogo.com.png"),
    new Voucher(3, "Desigual", "15%", "http://www.stickpng.com/assets/images/5a1ac8c1f65d84088faf1375.png"),
    new Voucher(4, "Yves Delorme","30€", "https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/052014/yves_delorme_logo_new_0.png"),
    new Voucher(5, "Gucci","20%", "http://diylogodesigns.com/blog/wp-content/uploads/2017/07/gucci-vector-logo-768x768.png"),
    new Voucher(6, "Prada", "15%", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Prada-Logo.svg/268px-Prada-Logo.svg.png"),
    new Voucher(7, "Giorgio Armani", "10%", "https://seeklogo.com/images/G/Giorgio_Armani-logo-C67193A325-seeklogo.com.png"),
    new Voucher(8, "Desigual", "15%", "http://www.stickpng.com/assets/images/5a1ac8c1f65d84088faf1375.png"),
    new Voucher(9, "Yves Delorme","30€", "https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/052014/yves_delorme_logo_new_0.png"),
    new Voucher(10, "Gucci","20%", "http://diylogodesigns.com/blog/wp-content/uploads/2017/07/gucci-vector-logo-768x768.png"),
];

var clothes = [
    new Cloth(1,"robe rouge 1", "https://media.missguided.com/s/missguided/DE908678_set/1/robe-courte-rouge--volant-col-montant-et-paules-dnudes.jpg"),
    new Cloth(2,"robe rouge 2", "https://www.lamodeuse.com/173009-thickbox_default/robe-bordeaux-en-suedine-avec-fermeture-eclaire.jpg"),
    new Cloth(3,"robe bleu 1", "https://www.tendances-de-mode.com/images/upload/1469818359.jpg"),
    new Cloth(4,"robe bleu 2", "http://www.robeforyou.com/wp-content/uploads/2017/09/Robe-Asos-mariage-dentelle-bleu-nuit-BCBG-Max-Azria-l-La-Fiancee-du-Panda-blog-mariage.jpg"),
    new Cloth(5,"robe verte 1", "https://i.pinimg.com/originals/2d/bd/da/2dbdda7b17437bd47be7450aaf397b78.jpg"),
    new Cloth(6,"robe verte 2", "http://www.cestmarobe.com/896-product/louer-robe-msgm-longue-one-shoulder-location.jpg"),
    new Cloth(7,"Pullover bleu 1", "http://blzjeans.com/32357-118767-thickbox/pullover-homme-bleu-navy-maille-col-montant-deeluxe-74.jpg"),
    new Cloth(8,"Pullover bleu 2", "https://images-na.ssl-images-amazon.com/images/I/91d0B07ptYL._UX342_.jpg"),
    new Cloth(9,"Sweatshirt bleu 2", "https://smhttp-ssl-33667.nexcesscdn.net/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/6/1615515085319_075.jpg"),
    new Cloth(10,"Sweatshirt bleu 2", "https://i.pinimg.com/736x/24/45/d5/2445d52e0333584184fbf41008801e34--mens-sweatshirts-mens-hoodies.jpg"),
    new Cloth(11,"Cargo short 1", "http://images.yancor.com/cargo-shorts-men-urban-classics-short-pants-beige-37107.jpg"),
    new Cloth(12,"Cargo short 2", "https://ae01.alicdn.com/kf/HTB1r8cAeU1HTKJjSZFmq6xeYFXaX/Summer-Men-s-Baggy-Multi-Pocket-Military-Zipper-Cargo-Shorts-breeches-Male-Long-Army-Green-Khaki.jpg_640x640q90.jpg"),
    new Cloth(13,"Débardeur gris 1", "https://www.laboutiqueofficielle.com/media/produit/img/URBCL_TB-382_GREY_01_427x427.jpg"),
    new Cloth(14,"Débardeur gris 2", "http://www.dressingdiscount.fr/8000-27610-thickbox/debardeur-blv06-gris.jpg"),
    new Cloth(15,"Chaussures homme 1","https://www.devred.com/media/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/4/6/4601058_03_1.jpg"),
    new Cloth(16,"Chaussures homme 2","https://dz.jumia.is/Ndv4SI6pz-8jmmJJwnP-Zz5TVIo=/fit-in/680x680/filters:fill(white):sharpen(1,0,false):quality(80)/product/13/333/1.jpg"),
    new Cloth(17,"Pantalon 1","https://www.lattitudecuir.com/3135-thickbox_default/pantalon-legging-sans-poches-cuir-agneau-stretch-noir-femme-mod%C3%A8le-bila-.jpg"),
    new Cloth(18,"Pantalon 2","https://i2.cdscdn.com/pdt2/8/1/9/1/700x700/mp08121819/rw/pantalon-jeans-femme-taille-basse-stretch-top-jean.jpg"),
    new Cloth(19,"Manteau","https://static.monshowroom.com/img-collection/3/5/6/4/7/1/356471-01-e.jpg"),
    new Cloth(20,"Trench","https://cdn.lookastic.com/trench-rouge/coat-kent-double-breasted-skirted-trench-original-188329.jpg"),
];

class Api {
    static nextSetDelay = 500;
    static loginDelay = 500;
    static vouchersDelay = 500;

    constructor() {
        this.username = "";
        this.sex = null;
        this.age = 0;
        this.inc = 0;
    }

    getMyVouchers() {
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                resolve(vouchers);
            }, Api.vouchersDelay);
        });
    }

    getNextSet() {
        let un = clothes[this.inc++];
        let deux = clothes[this.inc++];

        let futurUn = clothes[this.inc+1];
        let futurDeux = clothes[this.inc+2];

        if (futurUn) {
            Image.prefetch(futurUn.image);
        }

        if (futurDeux) {
            Image.prefetch(futurDeux.image);
        }

        return new Promise((resolve, reject) => {
            setTimeout(function() {
                if (un && deux) {
                    resolve([un, deux]);
                }
                else{
                    reject();
                }
            }, Api.nextSetDelay);
        });
    }

    login(user, password) {
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                if (user.toLowerCase() == "test" && password.toLowerCase() == "test") resolve(true);
                else reject(false);
            }, Api.loginDelay);
        });
    }

    setAge(age) {
        if (age < 1 || age > 120) {
            return false;
        }
        this.age = age;
        return true;
    }

    setSex(sex) {
        if (!sex) {
            return false;
        }
        this.sex = sex;
        return true;
    }

    isAgeOk() {
        return this.age != 0;
    }

    isSexOk() {
        return this.sex != null;
    }

    resetQueue() {
        this.inc = 0;
    }
}

var api = new Api();

export default api;
