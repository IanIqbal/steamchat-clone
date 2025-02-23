import { useEffect, useState } from 'react';
import { ViroARScene, ViroText, Viro3DObject, ViroAmbientLight} from '@reactvision/react-viro';


export const ArExample = (props) => {
   
    return (
    <ViroARScene>
        <ViroAmbientLight color="#FFFFFF" />
         <Viro3DObject
        source={require('../assets/res/object_soccerball/object_soccer_ball.vrx')}
        resources={[
          require('../assets/res/object_soccerball/object_soccer_ball_normal.png'),
          require('../assets/res/object_soccerball/object_soccer_ball_specular.png'),
          require('../assets/res/object_soccerball/object_soccer_ball_diffuse.png'),
        ]}
        type="VRX"
        position={[0.0, 0.0, -1.2]}
        scale={[1, 1, 1]}
      />
       <Viro3DObject
        source={require('../assets/res/emoji_smile/emoji_smile.vrx')}
        resources={[
          require('../assets/res/emoji_smile/emoji_smile_normal.png'),
          require('../assets/res/emoji_smile/emoji_smile_specular.png'),
          require('../assets/res/emoji_smile/emoji_smile_diffuse.png'),
        ]}
        type="VRX"
        position={[0.0, 1.0, -1.3]}
        scale={[1, 1, 1]}
      />
          <ViroText text="Hello World" position={[0, -.1, -0.5]} />
    </ViroARScene>
    )
}