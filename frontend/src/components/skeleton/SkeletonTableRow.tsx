import SkeletonElement from "./SkeletonElement";

const SkeletonTableRow = () => {
  const styles = {
    height: 10,
  };
  return (
    <div className="grid col-8 gap-20 items-center">
      <div className="span-4 flex px-20 gap-10 items-center">
        <SkeletonElement
          classNames="h-100 bg-fade SkeletonAnimate rounded-lg"
          css={{ width: 70 }}
        />
        <div className="flex flex-col w-75 gap-10">
          <SkeletonElement
            classNames="w-25 bg-fade SkeletonAnimate rounded-xlg"
            css={styles}
          />
          <SkeletonElement
            classNames="w-50 bg-fade SkeletonAnimate rounded-xlg"
            css={styles}
          />
        </div>
      </div>
      <SkeletonElement
        classNames="w-50 bg-fade SkeletonAnimate rounded-lg"
        css={styles}
      />
      <SkeletonElement
        classNames="w-50 bg-fade SkeletonAnimate rounded-lg"
        css={styles}
      />
      <SkeletonElement
        classNames="w-50 bg-fade SkeletonAnimate rounded-lg"
        css={styles}
      />
      <div className="flex gap-10">
        <SkeletonElement
          classNames="w-25 bg-fade SkeletonAnimate rounded-lg"
          css={styles}
        />
        <SkeletonElement
          classNames="w-25 bg-fade SkeletonAnimate rounded-lg"
          css={styles}
        />
      </div>
    </div>
  );
};

export default SkeletonTableRow;
