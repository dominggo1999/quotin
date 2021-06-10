import { Rnd } from 'react-rnd';

const RndLayer = ({ children, className }) => {
  return (
    <Rnd
      className="border-4 border-red-400"
      enableResizing={{
        top: false,
        right: true,
        bottom: false,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
      default={{
        x: 0,
        y: 0,
        width: 200,
        height: 200,
      }}
    >
      <div className="flex justify-center items-center w-full h-full">
        <h1 className="text-white text-8xl">Makan bang</h1>
      </div>
    </Rnd>
  );
};

export default RndLayer;
