import { useNavigate } from 'react-router-dom';

const SceneCard = (props) => {
  const { sceneId, sceneName, createdAt, updatedAt, image } = props;
  const navigate = useNavigate();

  return (
    <div className="relative min-w-[600px] bg-zinc-900 rounded-[10px] p-4 flex flex-col items-start gap-2 shadow-md">
      <button
        className="hover:text-emerald-500"
        onClick={() => navigate(`/scene/${sceneId}`, { state: props })}
      >
        {sceneName}
      </button>
      <div className="text-[11px]">
        <span className="text-gray-400">created:&nbsp;</span>
        <span>{createdAt}</span>
      </div>
      <div className="text-[11px]">
        <span className="text-gray-400">updated:&nbsp;</span>
        <span>{updatedAt}</span>
      </div>
      <div className="text-[11px]">
        <span className="text-gray-400">id:&nbsp;</span>
        <span>{sceneId}</span>
      </div>
      <button className="absolute m-4 top-0 right-0 fill-gray-400 hover:fill-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="18px" width="18px">
          <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
        </svg>
      </button>
    </div>
  );
};

export default SceneCard;
