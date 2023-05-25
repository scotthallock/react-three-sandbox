const SceneCard = (props) => {
  const { sceneId, sceneName, createdAt, updatedAt, image } = props;

  return (
    <div className="bg-zinc-900 rounded-[10px] p-4 flex flex-col gap-2">
      <span>{sceneName}</span>
      <span>{createdAt}</span>
      <span>{updatedAt}</span>
      <span>{sceneId}</span>
    </div>
  );
};

export default SceneCard;
