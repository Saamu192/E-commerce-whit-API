import { UserService } from "../services/UserService.js";
import { ShowHandler } from "../handlers/ShowHandler.js";

import { FormHandler } from "../handlers/FormHandler.js";
import { AuthHandler } from "../handlers/AuthHandler.js";
import { DashBoardHandler } from "../handlers/DashBoardHandler.js";
import { ProductService } from "../services/ProductService.js";
import { WarningHandler } from "../handlers/WarningHandler.js";

const verify = await AuthHandler.userVerify();

if (verify) {
  ShowHandler.headerMain(verify);

  const products = await ProductService.getPrivateProducts(
    localStorage.getItem("Token")
  );
  console.log(products);
  DashBoardHandler.listProductsInDashboard(products);

  const filters = document.querySelectorAll(".menu__item");
  const rightSide__field = document.querySelector(".rightSide__field");
  const open = document.querySelector(".open");
  const modal__close = document.querySelector(".modal__close");

  filters.forEach((filter) => {
    filter.addEventListener("click", (event) => {
      const children = event.currentTarget.children;
      const category = children[children.length - 1].innerText;

      const filtered = ShowHandler.filterPerCategory(products, category);

      DashBoardHandler.listProductsInDashboard(filtered);
      ShowHandler.changeTheSelected(event.currentTarget);
    });
  });

  rightSide__field.addEventListener("keyup", (event) => {
    const text = event.currentTarget.value;

    if (text) {
      const searched = ShowHandler.searchedProducts(text, products);
      DashBoardHandler.listProductsInDashboard(searched);
    } else {
      DashBoardHandler.listProductsInDashboard(products);
    }
  });

  DashBoardHandler.listProductsInDashboard();

  modal__close.addEventListener("click", (event) => {
    event.preventDefault();
    DashBoardHandler.closeModal();
  });

  const modal__forfeit = document.querySelector("#modal__forfeit");
  modal__forfeit.addEventListener("click", (event) => {
    event.preventDefault();
    DashBoardHandler.closeModal();
  });

  const modal__save = document.querySelector("#modal__save");
  modal__save.addEventListener("click", async (event) => {
    event.preventDefault;
    await DashBoardHandler.sendModal(event);
    location.reload();
  });

  const productTagAll = document.querySelectorAll(
    ".modal__field.modal__field--radio"
  );
  productTagAll.forEach((tag) => {
    tag.addEventListener("click", (event) => {
      event.preventDefault();
      DashBoardHandler.changeTag(event, productTagAll);
    });
  });

  const add__newProduct = document.querySelector(".open");
  add__newProduct.addEventListener("click", (event) => {
    event.preventDefault();
    DashBoardHandler.modalDashboard(event);
  });
  const delete__btn = document.querySelector("#modal__btn--yes");
  delete__btn.addEventListener("click", async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("Token");
    const productId = document.querySelector(".modal__remove");
    await ProductService.deleteProduct(token, productId.id);
    const container__remove = document.querySelector(
      "#modal__cadastrar--remove"
    );
    container__remove.classList.remove("show");
    DashBoardHandler.listProductsInDashboard();
  });

  const dont__delete = document.querySelector("#modal__btn--no");
  dont__delete.addEventListener("click", (event) => {
    event.preventDefault();
    const container__remove = document.querySelector(
      "#modal__cadastrar--remove"
    );
    container__remove.classList.remove("show");
  });
} else {
  location.href = "../../index.html";
}
