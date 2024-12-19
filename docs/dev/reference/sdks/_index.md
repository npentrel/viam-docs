---
title: "Write control code with Viam SDKs"
linkTitle: "SDKs"
weight: 10
type: "docs"
description: "Program and control your machines in the languages you already know like Python, Go, TypeScript, C++, and Flutter."
no_list: true
images: ["/general/code.png"]
aliases:
  - "product-overviews/sdk-as-client"
  - "program/sdk-as-client"
  - "program/sdks"
  - /program/
  - /program/run/
  - /program/debug/
date: "2024-05-23"
# updated: ""  # When the content was last entirely checked
---

Viam's SDK libraries wrap Viam's [gRPC APIs](https://github.com/viamrobotics/api) for interacting with a machine's [components](/dev/reference/apis/#component-apis) and [services](/dev/reference/apis/#service-apis), as well as for [cloud capabilities](/dev/reference/apis/robot/), such as [data management](/dev/reference/apis/data-client/) and [fleet management](/dev/reference/apis/fleet/).
You can run control code from anywhere; it does not necessarily have to be run on the same machine that runs `viam-server`.

![Diagram showing how a client connects to a machine with Viam. Diagram shows a client as a computer sending commands to a machine. Robot 1 then communicates with other robotic parts over gRPC and WebRTC and communicating that information back to the client.](/build/program/sdks/robot-client.png)

## Backend SDKs

Use the backend SDK to build business logic to control [components](/dev/reference/apis/#component-apis) and [services](/dev/reference/apis/#service-apis), as well as manage your [fleet](/dev/reference/apis/fleet/) and [data](/dev/reference/apis/data-client/), and [billing information](/dev/reference/apis/billing-client/), or [provision](/manage/fleet/provision/setup/) machines.
With the backend SDKs you can also create custom {{< glossary_tooltip term_id="modular-resource" text="modular resources" >}}.

{{< sectionlist-custom >}}
{{% sectionlist-custom-item link="/sdks/python/" %}}
{{% sectionlist-custom-item link="/sdks/go/" %}}
{{% sectionlist-custom-item link="/sdks/cpp/" %}}
{{< /sectionlist-custom >}}

## Frontend SDKs

Use the frontend SDK to control your machine's [components](/dev/reference/apis/#component-apis), as well as manage your [data](/dev/reference/apis/data-client/) or [provision](/manage/fleet/provision/setup/) machines.

{{< sectionlist-custom >}}
{{% sectionlist-custom-item link="/sdks/typescript/" %}}
{{< /sectionlist-custom >}}

## Mobile SDK

Use the mobile SDK to build iOS and Android apps to control your machine's [components](/dev/reference/apis/#component-apis), as well as manage your [fleet](/dev/reference/apis/fleet/) and [data](/dev/reference/apis/data-client/), or [provision](/manage/fleet/provision/setup/) machines.

{{< sectionlist-custom >}}
{{% sectionlist-custom-item link="/sdks/flutter/" %}}
{{< /sectionlist-custom >}}

<br>

## Installation

{{< alert title="Note" color="note" >}}
TODO: might need removing.
{{< /alert >}}

To install your preferred Viam SDK on your Linux or macOS development machine or [single-board computer](/components/board/), run one of the following commands in your terminal:

{{< tabs >}}
{{% tab name="Python" %}}

If you are using the Python SDK, [set up a virtual environment](/sdks/python/python-venv/) to package the SDK inside before running your code, avoiding conflicts with other projects or your system.

For macOS (both Intel `x86_64` and Apple Silicon) or Linux (`x86`, `aarch64`, `armv6l`), run the following commands:

```sh {class="command-line" data-prompt="$"}
python3 -m venv .venv
source .venv/bin/activate
pip install viam-sdk
```

Windows is not supported.
If you are using Windows, use the [Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/en-us/windows/wsl/install) and install the Python SDK using the preceding instructions for Linux.
For other unsupported systems, see [Installing from source](https://python.viam.dev/#installing-from-source).

If you intend to use the [ML (machine learning) model service](/services/ml/), use the following command instead, which installs additional required dependencies along with the Python SDK:

```sh {class="command-line" data-prompt="$"}
pip install 'viam-sdk[mlmodel]'
```

{{% /tab %}}
{{% tab name="Go" %}}

```sh {class="command-line" data-prompt="$"}
go get go.viam.com/rdk/robot/client
```

{{% /tab %}}
{{% tab name="TypeScript" %}}

```sh {class="command-line" data-prompt="$"}
npm install @viamrobotics/sdk
```

{{< alert title="Info" color="info" >}}
The TypeScript SDK currently only supports building web browser apps.
{{< /alert >}}

{{% /tab %}}
{{% tab name="C++" %}}

Follow the [instructions on the GitHub repository](https://github.com/viamrobotics/viam-cpp-sdk/blob/main/BUILDING.md).

{{% /tab %}}
{{% tab name="Flutter" %}}

```sh {class="command-line" data-prompt="$"}
flutter pub add viam_sdk
```

{{% /tab %}}
{{< /tabs >}}

## Code samples

Navigate to the **CONNECT** tab on your machine's page on the [Viam app](https://app.viam.com/robots) and select one of the programming languages.

The sample code will show you how to authenticate and connect to a machine's `viam-server` instance, as well as some of the methods you can use on your configured components and services.

For a full list of available API methods, see [Component APIs](/dev/reference/apis/#component-apis) and [Service APIs](/dev/reference/apis/#service-apis).

{{%expand "Click this to see example connection code" %}}
{{< tabs >}}
{{< tab name="Python" >}}

```python {class="line-numbers linkable-line-numbers"}
import asyncio

from viam.robot.client import RobotClient


async def connect():
    opts = RobotClient.Options.with_api_key(
      # Replace "<API-KEY>" (including brackets) with your machine's API key
      api_key='<API-KEY>',
      # Replace "<API-KEY-ID>" (including brackets) with your API key ID
      api_key_id='<API-KEY-ID>'
    )
    return await RobotClient.at_address('ADDRESS FROM THE VIAM APP', opts)


async def main():
    robot = await connect()

    print('Resources:')
    print(robot.resource_names)

    await robot.close()

if __name__ == '__main__':
    asyncio.run(main())
```

{{< /tab >}}
{{< tab name="Go" >}}

```go {class="line-numbers linkable-line-numbers"}
package main

import (
  "context"

  "go.viam.com/rdk/logging"
  "go.viam.com/rdk/robot/client"
  "go.viam.com/rdk/utils"
)

func main() {
  logger := logging.NewLogger("client")
  robot, err := client.New(
      context.Background(),
      "ADDRESS FROM THE VIAM APP",
      logger,
      client.WithDialOptions(utils.WithEntityCredentials(
      // Replace "<API-KEY-ID>" (including brackets) with your machine's API key ID
      "<API-KEY-ID>",
      utils.Credentials{
          Type:    utils.CredentialsTypeAPIKey,
          // Replace "<API-KEY>" (including brackets) with your API key
          Payload: "<API-KEY>",
      })),
  )
  if err != nil {
      logger.Fatal(err)
  }
  defer robot.Close(context.Background())
  logger.Info("Resources:")
  logger.Info(robot.ResourceNames())
}
```

{{< /tab >}}
{{< tab name="TypeScript" >}}

{{< alert title="Info" color="info" >}}
The TypeScript SDK currently only supports building web browser apps.
{{< /alert >}}

```ts {class="line-numbers linkable-line-numbers"}
// This code must be run in a browser environment.

import * as VIAM from "@viamrobotics/sdk";

async function main() {
  // Replace with the host of your actual machine running Viam.
  const host = "ADDRESS FROM THE VIAM APP";

  const robot = await VIAM.createRobotClient({
    host,
    credentials: {
      // Replace "<API-KEY>" (including brackets) with your machine's api key
      type: "api-key",
      payload: "<API-KEY>",
      // Replace "<API-KEY-ID>" (including brackets) with your machine's api key id
      authEntity: "<API-KEY-ID>",
    },
    signalingAddress: "https://app.viam.com:443",
  });

  console.log("Resources:");
  console.log(await robot.resourceNames());
}

main().catch((error) => {
  console.error("encountered an error:", error);
});
```

{{< /tab >}}
{{< tab name="C++" >}}

{{< alert title="Stability Notice" color="note" >}}
The C++ SDK is currently in beta.
{{< /alert >}}

```cpp {class="line-numbers linkable-line-numbers"}
#include <string>
#include <vector>

#include <boost/optional.hpp>

#include <viam/sdk/robot/client.hpp>

using namespace viam::sdk;

int main() {
    std::string host("ADDRESS FROM THE VIAM APP");
    DialOptions dial_opts;
    // Replace "<API-KEY-ID>" with your machine's api key ID
    dial_opts.set_entity(std::string("<API-KEY-ID>"));
    // Replace "<API-KEY>" with your machine's api key
    Credentials credentials("api-key", "<API-KEY>");
    dial_opts.set_credentials(credentials);
    boost::optional<DialOptions> opts(dial_opts);
    Options options(0, opts);

    auto robot = RobotClient::at_address(host, options);

    std::cout << "Resources:\n";
    for (const Name& resource: robot->resource_names()) {
      std::cout << "\t" << resource << "\n" << std::endl;
    }

    return EXIT_SUCCESS;
}
```

{{< /tab >}}
{{< tab name="Flutter" >}}

{{< alert title="Stability Notice" color="note" >}}
The Flutter SDK is currently in beta.
{{< /alert >}}

```cpp {class="line-numbers linkable-line-numbers"}
// This must be run from inside an existing app,
// e.g. the default Flutter app created by `flutter create APP_NAME`

// Step 1: Import the viam_sdk
import 'package:viam_sdk/viam_sdk.dart';

// Step 2: Call this function from within your widget
Future<void> connectToViam() async {
  const host = 'ADDRESS FROM THE VIAM APP';
  // Replace '<API-KEY-ID>' (including brackets) with your API key ID
  const apiKeyID = '<API-KEY-ID>';
  // Replace '<API-KEY>' (including brackets) with your API key
  const apiKey = '<API-KEY>';

  final robot = await RobotClient.atAddress(
    host,
    RobotClientOptions.withApiKey(apiKeyId, apiKey),
  );
  print(robot.resourceNames);
}
```

{{% /tab %}}
{{< /tabs >}}
{{% /expand%}}

Copy this code into a file on your development machine and [run it](#run-code).

You can run your program on any computer which:

1. has the appropriate SDK installed
2. can establish a connection to your machine through the cloud, on a local or wide area network (LAN or WAN), or [locally](/sdks/#run-code)

### Authentication

{{< readfile "/static/include/program/authenticate.md" >}}

### Apps with authentication

If you need to build apps with custom login flows, [contact us](mailto:support@viam.com).
