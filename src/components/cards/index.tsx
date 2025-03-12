import TitleLayout from '@/components/title';
import Card from './card';
import { getAllSlug } from '@/libs/get-all-slug';
import { getMarkdown } from '@/libs/get-markdown';
import styles from './index.module.scss';

type CardProps = {
  children: React.ReactNode;
  category: string;
};

const Cards = async ({ children, category }: CardProps) => {
  const slugs = getAllSlug(`contents`);

  const cards = (
    await Promise.all(
      slugs.map(async (slug) => {
        const markdown = await getMarkdown(`contents/${slug}.md`);
        if (!markdown) {
          return null;
        }
        const { data } = markdown;
        return {
          slug,
          title: data.title || 'No Title',
          tag: data.tag || '',
          date: data.date || 'No Date', // date を明示的に指定
          imageUrl: data.thumbnail || '/default/icon.webp',
          category: data.category || '',
        };
      }),
    )
  ).filter(Boolean);

  const filteredCards =
    category === 'All'
      ? cards
      : cards.filter((card) => card.category === category);

  return (
    <div>
      <TitleLayout>{children}</TitleLayout>
      <div className={styles.container}>
        {filteredCards.map(
          ({ title, tag, date, slug, imageUrl, category }, i) => (
            <Card
              key={i}
              title={title}
              tag={tag}
              date={date}
              imageUrl={imageUrl}
              link={`posts/${category}/${slug}`} // link を適切に設定
            />
          ),
        )}
      </div>
    </div>
  );
};

export default Cards;
