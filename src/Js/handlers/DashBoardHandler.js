import { ProductService } from "../services/ProductService.js";

export class DashBoardHandler {
  static addClassList(id) {
    const modal = document.getElementById(id);
    modal.classList.add("mostrar");
  }

  static removeClassList(id) {
    const modal = document.getElementById(id);
    modal.classList.remove("mostrar");
  }

  static async listProductsInDashboard(privateProducts) {
    if (!privateProducts) {
      privateProducts = await ProductService.getPrivateProducts(
        localStorage.getItem("Token")
      );
    }

    const mainBody = document.querySelector(".body");
    mainBody.innerText = "";

    privateProducts.forEach((product) => {
      const card = document.createElement("article");
      const card__product = document.createElement("div");
      const card__image = document.createElement("img");
      const card__title = document.createElement("h3");
      const card__categories = document.createElement("div");
      const card__category = document.createElement("span");
      const card__description = document.createElement("div");
      const card__text = document.createElement("p");
      const card__actions = document.createElement("div");
      const card__btnEdit = document.createElement("button");
      const card__btnRemove = document.createElement("button");

      card.classList.add("card");
      card__product.classList.add("card__product");
      card__image.classList.add("card__image");
      card__image.src = product.imagem;
      card__image.alt = product.nome;
      card__title.classList.add("card__title");
      card__title.innerText = product.nome;
      card__categories.classList.add("card__categories");
      card__category.classList.add("card__category");
      card__category.innerText = product.categoria;
      card__description.classList.add("card__description");
      card__text.classList.add("card__text");
      card__text.innerText = product.descricao;
      card__actions.classList.add("card__actions");
      card__btnEdit.classList.add("card__btn");
      card__btnEdit.classList.add("card__btn--edit");
      card__btnEdit.innerHTML =
        '<img src="../assets/images/edit.png" alt="edit image">';
      card__btnRemove.classList.add("card__btn");
      card__btnRemove.classList.add("card__btn--remove");
      card__btnRemove.innerHTML =
        '<img src="../assets/images/trash.png" alt="trash image">';

      card__btnEdit.addEventListener("click", (event) => {
        this.modalDashboard(event, product);
      });

      card__btnRemove.addEventListener("click", (event) => {
        this.modalDashboard(event, product);
      });

      card.append(
        card__product,
        card__categories,
        card__description,
        card__actions
      );
      card__product.append(card__image, card__title);
      card__categories.appendChild(card__category);
      card__description.appendChild(card__text);
      card__actions.append(card__btnEdit, card__btnRemove);

      mainBody.appendChild(card);
    });
  }
  static async modalDashboard(event, product) {
    const token = localStorage.getItem("Token");
    const btn__class = event.path[1].classList[1];
    console.log(btn__class);
    if (btn__class === "card__btn--edit") {
      const modal = document.querySelector(".modal__container");
      modal.style.display = "flex";
      const productName = document.querySelector("#modal__title");
      const productDescription = document.querySelector("#modal__description");
      const productPrice = document.querySelector("#modal__price");
      const productImg = document.querySelector("#modal__image");
      const productContainer = document.querySelector(".modal");
      const modalTitle = document.querySelector("#modal__title--main");
      modalTitle.innerText = "Edição de Produtos";
      productContainer.id = product.id;
      const productTagAll = document.querySelectorAll(
        ".modal__field.modal__field--radio"
      );
      const productTag = [...productTagAll];
      const tagToLower = product.categoria.toLowerCase();
      productTag.forEach((element) => {
        element.classList.remove("modal__field--salmon");
        if (element.id === tagToLower) {
          element.classList.add("modal__field--salmon");
        }
      });
      productImg.value = product.imagem;
      productPrice.value = product.preco;
      productDescription.value = product.descricao;
      productName.value = product.nome;
    } else if (btn__class === "card__btn--remove") {
      const container__remove = document.querySelector(
        "#modal__cadastrar--remove"
      );
      const container__id = document.querySelector(".modal__remove");
      container__id.id = product.id;
      container__remove.classList.add("show");
    } else {
      const modalTitle = document.querySelector("#modal__title--main");
      modalTitle.innerText = "Adicionar novo Produto";
      const modal = document.querySelector(".modal__container");
      modal.style.display = "flex";
      const productName = document.querySelector("#modal__title");
      const productDescription = document.querySelector("#modal__description");
      const productPrice = document.querySelector("#modal__price");
      const productImg = document.querySelector("#modal__image");

      productImg.placeholder = "URL Da imagem do produto";
      productPrice.value = 0;
      productDescription.placeholder = "Adicione uma descrição do seu produto";
      productName.placeholder = "Nome do Produto";
    }
  }
  static closeModal() {
    const modal = document.querySelector(".modal__container");
    modal.style.display = "none";
  }
  static async sendModal(event) {
    const productId = event.path[2].id;
    const main__event = event.path[2].childNodes[3].childNodes[1];
    const data__base = [...main__event];
    const token = localStorage.getItem("Token");
    let newTag = "";
    const tag = document.querySelectorAll(".modal__field.modal__field--radio");
    tag.forEach((element) => {
      if (element.classList[3] === "modal__field--salmon") {
        newTag = element.innerText;
      }
    });
    const data__array = [];
    data__base.forEach((element) => {
      data__array.push(element.value);
    });
    let newValues = {
      nome: data__array[0],
      preco: data__array[2],
      categoria: newTag,
      descricao: data__array[1],
      imagem: data__array[3],
    };
    console.log(newValues);
    const modalTitle = document.querySelector("#modal__title--main");
    if (modalTitle.innerText === "Edição de Produtos") {
      await ProductService.editProduct(token, newValues, productId);
      this.closeModal();
      this.listProductsInDashboard();
    } else {
      await ProductService.createProduct(token, newValues);
      this.closeModal();
      this.listProductsInDashboard();
    }
  }

  static changeTag(event, tags) {
    const target = event.target;
    const newA = tags.forEach((element) => {
      if (element.classList[3] === "modal__field--salmon") {
        element.classList.remove("modal__field--salmon");
      }
      target.classList.add("modal__field--salmon");
    });
  }
}
