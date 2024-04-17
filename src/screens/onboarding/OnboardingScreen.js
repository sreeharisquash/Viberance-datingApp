import React from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import globalStyles from "../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import CommonButton from "../../components/commonbutton/CommonButton";
import { OnBoardingData } from "../../utils/mockData";
import OnBoardingBG1 from "../../assets/images/onboardingBG1.png";
import OnBoardingBG2 from "../../assets/images/onboardingBG2.png";

const slideWidth = Dimensions.get("window").width - 40;

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  const ref = React.useRef(null);

  const getBackgroundImage = () => {
    switch (currentSlideIndex) {
      case 0:
        return OnBoardingBG1;
      case 1:
        return OnBoardingBG2;
      default:
        return null;
    }
  };
  const Slide = ({ item }) => {
    return (
      //   <ImageBackground
      //     source={getBackgroundImage()}
      //     style={styles.bgContainer}
      //     resizeMode="cover"
      //   >
      <View style={styles.slideContainer}>
        <Text style={[globalStyles.headingThree, { textAlign: "center" }]}>
          {item.title}
        </Text>
        <Text style={[globalStyles.onboardingPara, { textAlign: "center" }]}>
          {item.para}
        </Text>
      </View>
    );
  };

  const handleNext = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    const offset = nextSlideIndex * slideWidth;
    ref?.current?.scrollToOffset({ offset });
  };

  return (
    <>
      <linearGradient
        colors={["#8D00C5", "#4B0082"]}
      />
      <ImageBackground
        source={getBackgroundImage()}
        style={[globalStyles.container]}
      >
        <FlatList
          ref={ref}
          data={OnBoardingData}
          contentContainerStyle={styles.flatListContainer}
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <Slide item={item} />}
          keyExtractor={(item) => item.id.toString()}
          onViewableItemsChanged={({ viewableItems }) => {
            if (viewableItems.length > 0) {
              setCurrentSlideIndex(viewableItems[0].index || 0);
            }
          }}
          getItemLayout={(data, index) => ({
            length: slideWidth,
            offset: slideWidth * index,
            index,
          })}
        />
        <View style={{ flexDirection: "row", gap: 2 }}>
          {OnBoardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicators,
                currentSlideIndex == index && { backgroundColor: "#0300AA" },
              ]}
            />
          ))}
        </View>
        <View style={styles.btns}>
          {currentSlideIndex === OnBoardingData.length - 1 ? (
            <CommonButton
              label="Get Started"
              bgColor="#8D00C5"
              color="white"
              style={styles.buttonCls}
              // onPress={() => navigation.navigate("Login")}
            />
          ) : (
            <CommonButton
              label="Next"
              bgColor="#8D00C5"
              color="white"
              style={styles.buttonCls}
              onPress={handleNext}
            />
          )}
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  slideContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    width: slideWidth,
    padding: 20,
    paddingBottom: 60,
  },
  bgContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonCls: {
    marginTop: 100,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  btns: {
    position: "absolute",
    bottom: "2%",
    width: "100%",
    alignSelf: "center",
  },
  indicators: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
  },
});

export default OnboardingScreen;
