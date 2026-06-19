/**
 * MenuSection Component
 *
 * @module components/MenuSection/MenuSection
 * @description Displays the cafe menu items (coffee & pizza) without requiring authentication
 */

import {
  makeStyles,
  tokens,
  Title2,
  Title3,
  Text,
  Card,
  CardHeader,
} from '@fluentui/react-components';
import {
  DrinkCoffee20Regular,
  DrinkToGo20Regular,
  DrinkMargarita20Regular,
  Drop20Regular,
  FoodCake20Regular,
  Food20Regular,
  FoodPizza20Regular,
  FoodChickenLeg20Regular,
  LeafOne20Regular,
  Fire20Regular,
} from '@fluentui/react-icons';
import { useTranslation } from 'react-i18next';

interface MenuItem {
  nameKey: string;
  descKey: string;
  price: string;
  icon: React.ReactNode;
  iconColor: string;
}

const coffeeItems: MenuItem[] = [
  { nameKey: 'menu.coffee.espresso', descKey: 'menu.coffee.espressoDesc', price: '$3.50', icon: <DrinkCoffee20Regular />, iconColor: '#6B4423' },
  { nameKey: 'menu.coffee.cappuccino', descKey: 'menu.coffee.cappuccinoDesc', price: '$4.50', icon: <DrinkToGo20Regular />, iconColor: '#D2691E' },
  { nameKey: 'menu.coffee.latte', descKey: 'menu.coffee.latteDesc', price: '$4.75', icon: <Drop20Regular />, iconColor: '#C49A6C' },
  { nameKey: 'menu.coffee.americano', descKey: 'menu.coffee.americanoDesc', price: '$3.75', icon: <DrinkMargarita20Regular />, iconColor: '#4A2C17' },
  { nameKey: 'menu.coffee.mocha', descKey: 'menu.coffee.mochaDesc', price: '$5.00', icon: <FoodCake20Regular />, iconColor: '#8B4513' },
];

const pizzaItems: MenuItem[] = [
  { nameKey: 'menu.pizza.margherita', descKey: 'menu.pizza.margheritaDesc', price: '$12.00', icon: <FoodPizza20Regular />, iconColor: '#E25822' },
  { nameKey: 'menu.pizza.pepperoni', descKey: 'menu.pizza.pepperoniDesc', price: '$14.00', icon: <Fire20Regular />, iconColor: '#DC2626' },
  { nameKey: 'menu.pizza.veggie', descKey: 'menu.pizza.veggieDesc', price: '$13.50', icon: <LeafOne20Regular />, iconColor: '#16A34A' },
  { nameKey: 'menu.pizza.bbqChicken', descKey: 'menu.pizza.bbqChickenDesc', price: '$15.00', icon: <FoodChickenLeg20Regular />, iconColor: '#D97706' },
  { nameKey: 'menu.pizza.fourCheese', descKey: 'menu.pizza.fourCheeseDesc', price: '$14.50', icon: <Food20Regular />, iconColor: '#F59E0B' },
];

const useStyles = makeStyles({
  section: {
    width: '100%',
    maxWidth: '900px',
    marginTop: tokens.spacingVerticalXXL,
  },
  sectionTitle: {
    marginBottom: tokens.spacingVerticalS,
    color: tokens.colorBrandForeground1,
  },
  sectionSubtitle: {
    display: 'block',
    marginBottom: tokens.spacingVerticalXL,
    color: tokens.colorNeutralForeground2,
  },
  categoryTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalM,
    marginTop: tokens.spacingVerticalL,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalXL,
  },
  card: {
    height: '100%',
    position: 'relative',
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
  },
  priceTag: {
    position: 'absolute',
    top: tokens.spacingVerticalS,
    right: tokens.spacingHorizontalS,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
  },
  itemHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
  },
  itemIcon: {
    fontSize: '20px',
    flexShrink: 0,
  },
  itemName: {
    fontWeight: tokens.fontWeightSemibold,
  },
  itemDesc: {
    color: tokens.colorNeutralForeground3,
  },
});

export function MenuSection(): React.JSX.Element {
  const styles = useStyles();
  const { t } = useTranslation();

  const renderItems = (items: MenuItem[]) =>
    items.map((item) => (
      <Card key={item.nameKey} className={styles.card}>
        <span className={styles.priceTag}>{item.price}</span>
        <CardHeader
          header={
            <span className={styles.itemHeader}>
              <span className={styles.itemIcon} style={{ color: item.iconColor }}>
                {item.icon}
              </span>
              <Text className={styles.itemName}>{t(item.nameKey)}</Text>
            </span>
          }
          description={<Text className={styles.itemDesc}>{t(item.descKey)}</Text>}
        />
      </Card>
    ));

  return (
    <section className={styles.section} aria-label={t('home.menuTitle')}>
      <Title2 className={styles.sectionTitle}>{t('home.menuTitle')}</Title2>
      <Text className={styles.sectionSubtitle} size={400}>
        {t('home.menuSubtitle')}
      </Text>

      {/* Coffee Section */}
      <div className={styles.categoryTitle}>
        <span style={{ color: '#6B4423' }}><DrinkCoffee20Regular /></span>
        <Title3>{t('menu.coffee.title')}</Title3>
      </div>
      <div className={styles.grid}>
        {renderItems(coffeeItems)}
      </div>

      {/* Pizza Section */}
      <div className={styles.categoryTitle}>
        <span style={{ color: '#E25822' }}><FoodPizza20Regular /></span>
        <Title3>{t('menu.pizza.title')}</Title3>
      </div>
      <div className={styles.grid}>
        {renderItems(pizzaItems)}
      </div>
    </section>
  );
}
