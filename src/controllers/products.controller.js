import { ProductsService } from "../services/products.service.js";
import { StatusCodes, Status } from "../utils/constants/constants.js";

export class ProductsController {
  productsService = new ProductsService();

  // 전체 상품 목록 조회
  getAllProducts = async (req, res, next) => {
    try {
      const products = await this.productsService.getAllProducts();

      return res.status(StatusCodes.OK).json(products);
    } catch (err) {
      next(err);
    }
  };

  // 상품 상세 조회
  getProductDetail = async (req, res, next) => {
    const { productId } = req.params;
    try {
      const product = await this.productsService.getProductDetail(productId);

      return res.status(StatusCodes.OK).json(product);
    } catch (err) {
      next(err);
    }
  };

  // 상품 등록
  createProduct = async (req, res, next) => {
    const { title, content } = req.body;
    const userId = res.locals.user.id;
    try {
      const product = await this.productsService.createProduct(
        userId,
        title,
        content
      );

      return res.status(StatusCodes.CREATED).json(product);
    } catch (err) {
      next(err);
    }
  };

  // 상품 수정
  updateProduct = async (req, res, next) => {
    const { title, content, status = Status.SELLING } = req.body;
    const { productId } = req.params;
    try {
      const product = await this.productsService.updateProduct(
        productId,
        title,
        content,
        status
      );

      return res.status(StatusCodes.OK).json(product);
    } catch (err) {
      next(err);
    }
  };
}
