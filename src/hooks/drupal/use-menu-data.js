import { useStaticQuery, graphql } from "gatsby";

export const useMenuData = () => {
  const menuData = useStaticQuery(graphql`
    query HeaderMenuQuery {
      allMenuLinkContentMenuLinkContent(
        sort: {weight: ASC}
        filter: {enabled: {eq: true}}) {
          edges {
            node {
              bundle
              drupal_id
              drupal_parent_menu_item
              enabled
              expanded
              external
              langcode
              link {
                uri
                url
              }
              menu_name
              title
              weight
            }
          }
      }
    }
  `);

  return menuData;
};
