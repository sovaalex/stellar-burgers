import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  placeOrder,
  clearOrderModal,
  addOrderToHistory
} from '../../slices/ordersSlice';
import { clearConstructor } from '../../slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector((state) => ({
    bun: state.burgerConstructor.bun,
    ingredients: state.burgerConstructor.ingredients
  }));
  const ingredientsList = useSelector((state) => state.ingredients.data);
  const orderRequest = useSelector((state) => state.orders.orderRequest);
  const orderModalData = useSelector((state) => state.orders.orderModalData);
  const user = useSelector((state) => state.user.user);

  const onOrderClick = async () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
      return;
    }
    const ingredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (item: TConstructorIngredient) => item._id
      )
    ];
    const result = await dispatch(placeOrder(ingredients)).unwrap();
    const fullIngredients = result.ingredients
      .map((id: string) => ingredientsList.find((i) => i._id === id))
      .filter(Boolean);
    dispatch(
      addOrderToHistory({ ...result.order, ingredients: fullIngredients })
    );
    dispatch(clearConstructor());
  };
  const closeOrderModal = () => {
    dispatch(clearOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      (constructorItems.ingredients
        ? constructorItems.ingredients.reduce(
            (s: number, v: TConstructorIngredient) => s + v.price,
            0
          )
        : 0),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
