import React, { Component } from "react";
import ReceiptPage from "./ReceiptPage/ReceiptPage";
import StatsPage from "./StatsPage/StatsPage";
import StoresPage from "./StoresPage/StoresPage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity, Text } from "react-native";

import { actions } from "../../../store/reducers/builderReducer";
import Loader from "./../../LayoutSplashScreen";
import { firebaseInstance, FirebaseServiceContext } from "./../../firebaseService";

const Tab = createBottomTabNavigator();

import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
  return {
    initBuilderAppData: ({
      receipts = {},
      productCategory = [],
      productPriceFluctuation = {},
      stores = {},
      tvas = {},
    }) => {
      dispatch(
        actions.init_data({
          productCategory,
          productPriceFluctuation,
          receipts,
          stores,
          tvas,
        })
      );
    },
  };
}
function mapStateToProps({
  auth: {
    user: { uid },
  },
}) {
  return {
    uid,
  };
}
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isFetching: false,
    };
    this.firebaseInstance = firebaseInstance;
  }
  init = () => {
    this.firebaseInstance.setUid(this.props.uid);
    this.setState({ isFetching: true, error: null });
    const promise = new Promise((resolve, reject) => {
      this.firebaseInstance.initializeData().then(
        (data) => {
          console.log(data);
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
    promise.then(
      (data) => {
        this.props.initBuilderAppData({ ...data });
        this.setState({ isFetching: false });
      },
      (error) => {
        console.log(error);
        this.setState({ error, isFetching: false });
      }
    );
  };
  componentDidMount = () => {
    this.init();
  }
  render() {
    const { error, isFetching } = this.state;
    return (
      <>
        {error ? (
          <View>
            <View>
              <Text>{error.message}</Text>
            </View>
            <View>
              <TouchableOpacity
                style={{ width: 50, height: 20 }}
                onPress={this.init}
              >
                <Text style={{ fontSize: 25 }}>Retry</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : isFetching ? (
          <Loader text={"Loading firebase data..."} />
        ) : (
          <FirebaseServiceContext.Provider value={{ firebaseService: this.firebaseInstance }}>
            <Tab.Navigator>
              <Tab.Screen name="Receipts" component={ReceiptPage} />
              <Tab.Screen name="Stats" component={StatsPage} />
              <Tab.Screen name="Stores" component={StoresPage} />
            </Tab.Navigator>
          </FirebaseServiceContext.Provider>
        )}
      </>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
