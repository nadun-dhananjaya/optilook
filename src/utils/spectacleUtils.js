export const filterGroupAndSort = (data, filters) => {
  const { shapes, colors, weight, shapeOrder, colorOrder } = filters;

  // Filter based on the criteria
  const filteredData = data.filter((item) => {
    return (
      (!shapes || shapes.includes(item.shape)) &&
      (!colors || colors.includes(item.color)) &&
      (!weight || item.weight === weight)
    );
  });

  // Group by shape
  const groupedData = filteredData.reduce((acc, item) => {
    // Find or create a shape section
    let shapeSection = acc.find(
      (section) => section.title === `${item.shape.toUpperCase()} FRAMES`
    );
    if (!shapeSection) {
      shapeSection = {
        title: `${item.shape.toUpperCase()} FRAMES`,
        frames: [],
      };
      acc.push(shapeSection);
    }

    // Find or create a color section within the shape section
    let colorSection = shapeSection.frames.find(
      (frame) => frame.colorName === `${item.color.toUpperCase()} COLOR`
    );
    if (!colorSection) {
      colorSection = {
        colorName: `${item.color.toUpperCase()} COLOR`,
        details: [],
      };
      shapeSection.frames.push(colorSection);
    }

    // Add frame details (name and images) to the color section
    colorSection.details.push({
      name: item.name,
      images: [item.imagePath],
    });

    return acc;
  }, []);

  // Custom sort by shape order
  groupedData.sort((a, b) => {
    const aIndex = shapeOrder.indexOf(a.title.split(" ")[0].toUpperCase());
    const bIndex = shapeOrder.indexOf(b.title.split(" ")[0].toUpperCase());
    return aIndex - bIndex;
  });

  // Custom sort by color order within each shape group
  groupedData.forEach((shapeGroup) => {
    shapeGroup.frames.sort((a, b) => {
      const aIndex = colorOrder.indexOf(
        a.colorName.split(" ")[0].toUpperCase()
      );
      const bIndex = colorOrder.indexOf(
        b.colorName.split(" ")[0].toUpperCase()
      );
      return aIndex - bIndex;
    });
  });

  return groupedData;
};
