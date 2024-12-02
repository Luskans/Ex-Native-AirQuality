import Score from '@/components/home/Score';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";


export default function IndexScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        // <Image
        //   source={require('@/assets/images/partial-react-logo.png')}
        //   style={styles.reactLogo}
        // />
        <Text className="text-white text-center m-auto text-3xl font-bold">Air Quality</Text>
      }>
      {/* <Box className="bg-green-500 h-[200px] w-full rounded-xl flex flex-col justify-center items-center gap-4">
        <Text className="text-white text-3xl font-bold">Score: 28</Text>
        <Box className='flex flex-col justify-center items-center gap-2'>
          <Text className="text-white text-xl">Roanne, France</Text>
          <Text className="text-white text-md">12 février 2025</Text>
        </Box>
      </Box> */}

      <Box>
        <Score />
      </Box>
      
    </ParallaxScrollView>
  );
}
