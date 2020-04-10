import React, { Component } from "react";
import ReceiptPage from "./ReceiptPage/ReceiptPage";
import StatsPage from "./StatsPage/StatsPage";
import StoresPage from "./StoresPage/StoresPage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity } from "react-native";

import { actions } from "../../../store/reducers/builderReducer";
import Loader from "./../../LayoutSplashScreen";
import FirebaseDatabase from "./FirebaseDatabaseFunctions";

const Tab = createBottomTabNavigator();

import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
  return {
    initBuilderAppData: (
      {receipts = {},
      pCategories = [],
      productPriceFluctuation = {},
      stores = {},
      tvas = {}}
    ) => {
      dispatch(actions.init_build_data({
        pCategories,
        productPriceFluctuation,
        receipts,
        stores,
        tvas
      }));
    }
  };
}
function mapStateToProps({auth:{user:{uid}}}) {
  return {
   uid 
  };
}
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isFetching: false
    };
  }
  firebase_instance;
  init = () => {
    const firebase_instance = new FirebaseDatabase(this.props.uid);
    this.setState({ isFetching: true, error: null });
    firebase_instance.init().then(
      data => {
        this.props.initBuilderAppData({...data});
        this.setState({ isFetching: false });
      },
      error => {
        console.log(error);
        this.setState({ error, isFetching: false });
      }
    );
  };
  componentDidMount = () => {
    
    console.log(this.props.uid, "uid");
    this.init();
  };
  render() {
    const {
      error,
      isFetching
    } = this.state;
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
          <Tab.Navigator>
            <Tab.Screen name="Receipts" component={ReceiptPage} />
            <Tab.Screen name="Stats" component={StatsPage} />
            <Tab.Screen name="Stores" component={StoresPage} />
          </Tab.Navigator>
        )}
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
