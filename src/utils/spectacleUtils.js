export const filterGroupAndSort = (data, filters) => {
  const { shapes, colors, weight, shapeOrder, colorOrder } = filters;

  // Filter based on criteria
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

    // Add frame details
    colorSection.details.push({
      name: item.name,
      weight: item?.weight,
      images: [item.imagePath],
    });

    return acc;
  }, []);

  // Sort groups by shapeOrder
  groupedData.sort((a, b) => {
    const nameA = a.title.replace(" FRAMES", "").toUpperCase();
    const nameB = b.title.replace(" FRAMES", "").toUpperCase();
    const indexA = shapeOrder.findIndex(
      (shape) => shape.toUpperCase() === nameA
    );
    const indexB = shapeOrder.findIndex(
      (shape) => shape.toUpperCase() === nameB
    );
    return indexA - indexB;
  });

  // Sort color sections within each shape group by colorOrder
  groupedData.forEach((shapeGroup) => {
    shapeGroup.frames.sort((a, b) => {
      const nameA = a.colorName.replace(" COLOR", "").toUpperCase();
      const nameB = b.colorName.replace(" COLOR", "").toUpperCase();
      const indexA = colorOrder.findIndex(
        (color) => color.toUpperCase() === nameA
      );
      const indexB = colorOrder.findIndex(
        (color) => color.toUpperCase() === nameB
      );
      return indexA - indexB;
    });
  });

  return groupedData;
};
